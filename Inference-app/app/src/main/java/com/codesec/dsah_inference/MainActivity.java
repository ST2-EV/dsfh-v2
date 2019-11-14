package com.codesec.dsah_inference;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    public static SharedPreferences sharedPref;
    public String recent = null;
    public String savedurl;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button prev = (Button) findViewById(R.id.button2);
        sharedPref = getSharedPreferences("url", MODE_PRIVATE);
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_DENIED)
        {
            ActivityCompat.requestPermissions(this , new String[] {Manifest.permission.CAMERA}, 100);
        }
        savedurl = sharedPref.getString("URL", null);
        recent = getIntent().getStringExtra("RetUrl");
        if(recent == null)
        {
            recent = savedurl;
        }
        if(recent != null)
        {
            prev.setEnabled(true);
            if(recent != savedurl) {
                sharedPref.edit().putString("URL", recent).commit();
            }
        }
        else
        {
            prev.setEnabled(false);
        }

    }

    public void startqr(View view)
    {
        Intent myIntent = new Intent(this, qrCodeScanner.class);
        startActivity(myIntent);
    }

    public  Context getContext(){
        Context mContext = MainActivity.this;
        return mContext;
    }

    public void prevlink(View view)
    {
        Intent myIntent = new Intent(this, Inference.class);
        myIntent.putExtra("LINK_FROM_QR", recent);
        startActivity(myIntent);
    }
}
