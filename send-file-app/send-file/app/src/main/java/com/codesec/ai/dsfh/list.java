package com.codesec.ai.dsfh;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ArrayAdapter;
import android.widget.AdapterView;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Iterator;

public class list extends AppCompatActivity {


    //SERVER URL
    //add the link down there upto the "/" before. "a/" is added automatically from UploadAPIs.java
    //ignore the above, add only server link ending with a /

    public static final String link_to_server = "https://api-2445582824322.production.gw.apicast.io:443/send-file/";


    // #Thalpathy Rocks

    //SERVER URL

    private ListView dataListView;
    private EditText itemText;
    private Button findButton;
    private Button deleteButton;
    private Button addButton;
    private ImageButton trainButton;
    private ImageButton cameraButton;
    private Boolean searchMode = false;
    private Boolean itemSelected = false;
    private int selectedPosition = 0;
    ArrayList<String> listItems = new ArrayList<String>();
    ArrayList<String> listKeys = new ArrayList<String>();
    ArrayAdapter<String> adapter;
    private FirebaseDatabase database = FirebaseDatabase.getInstance();
    private DatabaseReference dbRef = database.getReference("disease");
    public static String pos;
    public String lnk;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);

        dataListView = (ListView) findViewById(R.id.dataListView);
        itemText = (EditText) findViewById(R.id.itemText);
        addButton = (Button) findViewById(R.id.addButton);
        findButton = (Button) findViewById(R.id.findButton);
        deleteButton = (Button) findViewById(R.id.deleteButton);
        //trainButton = (ImageButton) findViewById(R.id.imageButton4);
        cameraButton = (ImageButton) findViewById(R.id.button_choose_image);
        deleteButton.setEnabled(false);
        //trainButton.setEnabled(false);
        cameraButton.setEnabled(false);
        adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_single_choice,
                listItems);
        dataListView.setAdapter(adapter);
        dataListView.setChoiceMode(ListView.CHOICE_MODE_SINGLE);

        dataListView.setOnItemClickListener(
                new AdapterView.OnItemClickListener() {
                    public void onItemClick(AdapterView<?> parent,
                                            View view, int position, long id) {
                        selectedPosition = position;
                        itemSelected = true;
                        deleteButton.setEnabled(true);
                        //trainButton.setEnabled(true);
                        cameraButton.setEnabled(true);
                        pos = dataListView.getItemAtPosition(position).toString();
                        lnk = link_to_server + dataListView.getItemAtPosition(position).toString() + "/";
                        //Toast.makeText(list.this, pos, Toast.LENGTH_SHORT).show();
                        //Toast.makeText(list.this, sendUrl(), Toast.LENGTH_SHORT).show();
                    }
                });

        addChildEventListener();
    }


    private void addChildEventListener() {
        ChildEventListener childListener = new ChildEventListener() {

            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                adapter.add(
                        (String) dataSnapshot.child("name").getValue());

                listKeys.add(dataSnapshot.getKey());
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {
                String key = dataSnapshot.getKey();
                int index = listKeys.indexOf(key);

                if (index != -1) {
                    listItems.remove(index);
                    listKeys.remove(index);
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        };
        dbRef.addChildEventListener(childListener);
    }

    public void addItem(View view) {

        String item = itemText.getText().toString();
        String key = dbRef.push().getKey();

        itemText.setText("");
        dbRef.child(key).child("name").setValue(item);

        adapter.notifyDataSetChanged();
    }

    public void deleteItem(View view) {
        dataListView.setItemChecked(selectedPosition, false);
        dbRef.child(listKeys.get(selectedPosition)).removeValue();
    }

    public void findItems(View view) {

        Query query;

        if (!searchMode) {
            findButton.setText("Clear");
            query = dbRef.orderByChild("name").
                    equalTo(itemText.getText().toString());
            searchMode = true;
        } else {
            searchMode = false;
            findButton.setText("Find");
            query = dbRef.orderByKey();
        }

        if (itemSelected) {
            dataListView.setItemChecked(selectedPosition, false);
            itemSelected = false;
            deleteButton.setEnabled(false);
        }

        query.addListenerForSingleValueEvent(queryValueListener);
    }

    ValueEventListener queryValueListener = new ValueEventListener() {

        @Override
        public void onDataChange(DataSnapshot dataSnapshot) {

            Iterable<DataSnapshot> snapshotIterator = dataSnapshot.getChildren();
            Iterator<DataSnapshot> iterator = snapshotIterator.iterator();

            adapter.clear();
            listKeys.clear();

            while (iterator.hasNext()) {
                DataSnapshot next = (DataSnapshot) iterator.next();

                String match = (String) next.child("name").getValue();
                String key = next.getKey();
                listKeys.add(key);
                adapter.add(match);
            }

        }

        @Override
        public void onCancelled(DatabaseError databaseError) {
            Toast.makeText(list.this, databaseError.toString(), Toast.LENGTH_LONG).show();

        }
    };

    public void goback(View view) {
        Intent intent = new Intent(this, Loggedin.class);
        startActivity(intent);
    }

    public void camera(View view) {
        Intent intent = new Intent(this, ObjActivity.class);
        intent.putExtra("LINK", lnk);
        //Toast.makeText(this, lnk, Toast.LENGTH_SHORT).show();
        startActivity(intent);
    }

    public static String sendUrl() {
        //pos = pos + "  ";
        //pos = pos.replace("/\\s/g", "");
        String url = link_to_server ;
        return url;
    }

}