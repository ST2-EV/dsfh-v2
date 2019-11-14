package com.codesec.dsah_inference;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.Result;

import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class qrCodeScanner extends AppCompatActivity implements ZXingScannerView.ResultHandler {
    private ZXingScannerView mScannerView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_qr_code_scanner);
        mScannerView = new ZXingScannerView(this);   // Programmatically initialize the scanner view
        setContentView(mScannerView);
        mScannerView.setAutoFocus(true);
        mScannerView.setAutoFocus(true);
        mScannerView.setAutoFocus(true);
        mScannerView.setAutoFocus(true);
    }

    @Override
    public void onResume() {
        super.onResume();
        mScannerView.setResultHandler(this); // Register ourselves as a handler for scan results.
        mScannerView.startCamera();          // Start camera on resume
        mScannerView.setAutoFocus(true);
    }

    @Override
    public void onPause() {
        super.onPause();
        mScannerView.stopCamera();           // Stop camera on pause
    }

    @Override
    public void handleResult(Result rawResult) {
        // Do something with the result here
        Log.v("Result: ", rawResult.getText()); // Prints scan results
        Log.v("Format: ", rawResult.getBarcodeFormat().toString()); // Prints the scan format (qrcode, pdf417 etc.)
        if(rawResult.getText() != null)
        {
            Intent intent = new Intent(getBaseContext(), Inference.class);
            intent.putExtra("LINK_FROM_QR", rawResult.getText());
            startActivity(intent);
        }
        // If you would like to resume scanning, call this method below:
        else {
            Toast.makeText(this, "The scan failed, please try again !!", Toast.LENGTH_LONG).show();
            mScannerView.resumeCameraPreview(this);
        }
    }

}
