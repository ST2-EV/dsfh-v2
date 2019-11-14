package com.codesec.dsah_inference;

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

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.List;
import java.util.UUID;

import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.json.JSONObject;

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
    public static final String filename = "dsfh_inference_temp" + ".jpeg";
    public static String Response;
    public String[] send = new String[2];
    public String LINK ;
    @Override
    protected void onCreate(Bundle savedInstanceState)  {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_obj);
        File ab;
        LINK = getIntent().getStringExtra("LINK");

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
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CONTENT_REQUEST) {
            if (resultCode == RESULT_OK) {
                String path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).toString() + "/" + filename;
                uploadToServer(path, LINK);

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
        Call <JsonObject> call = uploadAPIs.uploadImage(part, description);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                Log.i("Response", response.body().toString());
                Response = response.body().toString();
                String s1 = Response.substring(Response.indexOf(":")+1);
                s1.trim();
                Response = s1 + "," + LINK;
                //Toast.makeText()
                if (response.isSuccessful()) {
                    if (response.body() != null) {
                        Log.v("onSuccess", response.toString());
                        finishit();
                    } else {
                        Log.v("onEmptyResponse", "Returned empty response");//Toast.makeText(getContext(),"Nothing returned",Toast.LENGTH_LONG).show();
                    }
                }
            }
            //@Override
            public void onFailure(Call<JsonObject> call,Throwable t)
            {
                Log.v("FAILURE", t.toString());
            }
        });

}
        public void finishit()
        {
            if(Response != null)
            {
                Intent intent = new Intent(getBaseContext(), Inference.class);
                intent.putExtra("POST", Response);
                intent.putExtra("url_ret", LINK);
                startActivity(intent);
            }
            else
            {
                Toast.makeText(this, "Something is wrong !", Toast.LENGTH_SHORT).show();
                Intent myIntent = new Intent(this, MainActivity.class);
                startActivity(myIntent);
            }
        }
}

