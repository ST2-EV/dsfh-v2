package com.codesec.ai.dsfh;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class RealtimeDBList extends AppCompatActivity {

    private ListView dataListView;
    private EditText itemText;
    private Button findButton;
    private Button deleteButton;
    private Boolean searchMode = false;
    private Boolean itemSelected = false;
    private int selectedPosition = 0;

    private FirebaseDatabase database = FirebaseDatabase.getInstance();
    private DatabaseReference dbRef = database.getReference("disease");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        dataListView = (ListView) findViewById(R.id.dataListView);
        itemText = (EditText) findViewById(R.id.itemText);
        findButton = (Button) findViewById(R.id.findButton);
        deleteButton = (Button) findViewById(R.id.deleteButton);
        deleteButton.setEnabled(false);

    }
}