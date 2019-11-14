package com.codesec.ai.dsfh;

import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.util.Log;
import com.loopj.android.http.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import org.apache.commons.lang3.RandomStringUtils;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;


public class ObjActivity extends AppCompatActivity /*implements UploadFileAsyncTaskCallback<UploadFileAsyncTask.Result>*/ {
    private static final int CONTENT_REQUEST=1337;
    private File output=null;
    public static String name = Long.toHexString(Double.doubleToLongBits(Math.random()));
    public final String filename = name + ".jpeg";
    public final String abc = filename;
    public String url;
    @Override
    protected void onCreate(Bundle savedInstanceState)  {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_obj);
        File ab;
        url = getIntent().getStringExtra("LINK");

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

        output=new File(dir, filename);

        i.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(output));

        startActivityForResult(i, CONTENT_REQUEST);


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode,
                                    Intent data) {
        if (requestCode == CONTENT_REQUEST) {
            if (resultCode == RESULT_OK) {
                String path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).toString() + "/" + abc;
                uploadToServer(path, url);

                //Intent i=new Intent(Intent.ACTION_VIEW);

                // i.setDataAndType(Uri.fromFile(output), "image/jpeg");

                //startActivity(i);

                //finish();
            }
        }
    }

    private void uploadToServer(String filePath, String url) {
        Retrofit retrofit = NetworkClient.getRetrofitClient(this, url);
        UploadAPIs uploadAPIs = retrofit.create(UploadAPIs.class);
        //Create a file object using file path
        File file = new File(filePath);
        // Create a request body with file and image media type
        RequestBody fileReqBody = RequestBody.create(MediaType.parse("image/*"), file);
        // Create MultipartBody.Part using file request-body,file name and part name
        MultipartBody.Part part = MultipartBody.Part.createFormData("file", file.getName(), fileReqBody);
        //Create request body with text description and text media type
        RequestBody description = RequestBody.create(MediaType.parse("text/plain"), "image-type");
        //
        Call call = uploadAPIs.uploadImage(part, description);
        call.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                Toast.makeText(ObjActivity.this, "Uploaded ! "+ response, Toast.LENGTH_LONG).show();
                finishit();

            }
            @Override
            public void onFailure(Call call, Throwable t) {
                //Toast.makeText(ObjActivity.this, "Failed "+ t.toString(), Toast.LENGTH_LONG).show();
                finishit();
            }
        });
    }

    public void finishit()
    {
            Intent intent = new Intent(getBaseContext(), list.class);
            startActivity(intent);
            rename();

    }
    public static void rename()
    {
        name = Long.toHexString(Double.doubleToLongBits(Math.random()));
    }
//    public static String genRandomName() {
//        byte[] array = new byte[7]; // length is bounded by 7
//        new Random().nextBytes(array);
//        String generatedString = new String(array, Charset.forName("UTF-8"));
//
//        return generatedString;
//    }
}
