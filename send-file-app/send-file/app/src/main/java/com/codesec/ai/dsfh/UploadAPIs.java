package com.codesec.ai.dsfh;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface UploadAPIs {
    @Multipart
    @POST("a/?user_key=402d46c6d21b86e66339d12e79e05366")
    Call<ResponseBody> uploadImage(@Part MultipartBody.Part file, @Part("name") RequestBody requestBody);
}