package com.cleanapp

import com.entrust.identity.mobile.common.storage.FileStore
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class RNModuleCommon(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "RNModuleCommon" // Name used in JavaScript

    // Example function exposed to JavaScript
    @ReactMethod
    fun readFromEncryptedFile( fileName: String, promise: Promise) {
        try {
            val result = FileStore.readStringFromFile(this.reactApplicationContext, fileName)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
    @ReactMethod
    fun writeToEncryptedFile(content: String, fileName: String, promise: Promise) {
        try {
            val result = FileStore.writeStringToFile(this.reactApplicationContext, fileName, content)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}