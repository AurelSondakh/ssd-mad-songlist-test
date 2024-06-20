package com.spotfy

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity

class SplashActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}
