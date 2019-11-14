package com.codesec.ai.dsfh;

import android.os.Build;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import org.apache.commons.lang3.RandomStringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.Method;
import java.util.Date;

public class Camera extends AppCompatActivity  {

    private static final int CONTENT_REQUEST=1337;
    private File output=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera2);


        if(Build.VERSION.SDK_INT>=24){
            try{
                Method m = StrictMode.class.getMethod("disableDeathOnFileUriExposure");
                m.invoke(null);
            }catch(Exception e){
                e.printStackTrace();
            }
        }

        Intent i=new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        File dir=
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
        String name = "temp" + ".jpeg";
        output=new File(dir, name);
        String toast = "File saved as " + name;
        Toast.makeText(this, toast, Toast.LENGTH_LONG).show();
        i.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(output));

        startActivityForResult(i, CONTENT_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode,
                                    Intent data) {
        if (requestCode == CONTENT_REQUEST) {
            if (resultCode == RESULT_OK) {
                Log.e("onActivityResult", output.getPath());
                try {
                    FileInputStream fileInputStream = new FileInputStream(output);
                    new UploadFileAsyncTask((UploadFileAsyncTaskCallback<UploadFileAsyncTask.Result>) this).execute(fileInputStream);
                } catch (Exception e) {
                    Log.e("onActivityResult", output.getPath(),e);
                    Toast.makeText(this, output.getPath(), Toast.LENGTH_LONG).show();
                }

                Intent i=new Intent(Intent.ACTION_VIEW);

                 i.setDataAndType(Uri.fromFile(output), "image/jpeg");

                startActivity(i);

                //Intent intent = new Intent(this, list.class);
                //startActivity(intent);

                finish();
            }
            else
            {
                Toast.makeText(this, "FAILED!!", Toast.LENGTH_LONG).show();
            }
        }
    }
}

