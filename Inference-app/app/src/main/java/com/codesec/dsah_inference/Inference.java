package com.codesec.dsah_inference;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Inference extends AppCompatActivity {
    public static String url;
    public static String res;
    public static String string1;
    public static String string2;
    public static String url_ret;
    public String[] ab = new String[2];
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inference);
        TextView textView = (TextView) findViewById(R.id.textView3);
        TextView textView1 = (TextView) findViewById(R.id.textView4);
        TextView textView2 = (TextView) findViewById(R.id.textView5);
        Button session = (Button) findViewById(R.id.button3);
        session.setVisibility(View.GONE);
        url = getIntent().getStringExtra("LINK_FROM_QR");
        url_ret = url;

        res = getIntent().getStringExtra("POST");
        if(res != null) {
            Pattern pattern = Pattern.compile(", *");
            Matcher matcher = pattern.matcher(res);
            if (matcher.find()) {
                string1 = res.substring(0, matcher.start());
                string2 = res.substring(matcher.end());
            }
        }
        if((url != null) || (string2 != null)) {
            Toast.makeText(this, "Authorised", Toast.LENGTH_LONG).show();
            textView.setText("READY");
            textView1.setText(url);
            session.setVisibility(View.VISIBLE);

        }
        else
        {
            //Toast.makeText(this, "url is null", Toast.LENGTH_SHORT).show();
            textView.setText("NOT READY");
            textView1.setText(url);
        }
        if(res != null)
        {
            string1 = string1.replaceAll("[^a-zA-Z0-9]", "");
            textView2.setText(string1);
        }
        //url_ret = getIntent().getStringExtra("url_ret");
        /*if(url_ret == null) {
            url_ret = getIntent().getStringExtra("url_ret");
        }*/
    }
    public void camera(View view)
    {
        Intent myIntent = new Intent(this, ObjActivity.class);
        myIntent.putExtra("LINK", url);
        startActivity(myIntent);
    }
    public static String sendUrl()
    {
        if(string2 != null)
        {
            return url;
        }
        else
        {
            //Toast.makeText(this, "Problem encountered", Toast.LENGTH_SHORT).show();
            return "abcd";
        }
    }
    public void saveandexit(View view)
    {
        Toast.makeText(this, "Ending session..", Toast.LENGTH_SHORT).show();
        Intent myIntent = new Intent(this, MainActivity.class);
        myIntent.putExtra("RetUrl", string2);
        startActivity(myIntent);
    }

}