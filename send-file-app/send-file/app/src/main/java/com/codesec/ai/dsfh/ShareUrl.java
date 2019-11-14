package com.codesec.ai.dsfh;

public class ShareUrl {

    public static String url = null;
    public static boolean go = false;

    public static void getUrl(String pos)
    {
        pos = pos.replaceAll("\\s+", "_").toLowerCase();
        url = "http://35.202.31.247:5000/send-file/" + pos + "/";
        if(url != null)
        {
            go = true;
        }
        else
        {
            go = false;
        }
    }

    public static String sendUrl() {
        if (go) {
            return url;
        }
        else
        {
            return "NO_URL";
        }
    }
}