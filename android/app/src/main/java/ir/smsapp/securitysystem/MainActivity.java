package ir.smsapp.securitysystem;

import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import androidx.appcompat.app.AlertDialog;

import com.getcapacitor.BridgeActivity;

import java.util.Locale;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Apply language before super.onCreate()
        applyAppLanguage();
        
        super.onCreate(savedInstanceState);
        
        // Configure status bar for immersive experience
        configureStatusBar();
    }
    
    /**
     * Apply the app language based on saved preferences or default to Persian
     */
    private void applyAppLanguage() {
        SharedPreferences settings = getSharedPreferences("ClientInfo", MODE_PRIVATE);
        String languageCode = settings.getString("Language", "fa"); // Default to Persian
        
        Resources resources = getResources();
        Configuration config = resources.getConfiguration();
        Locale locale = new Locale(languageCode);
        
        Locale.setDefault(locale);
        config.setLocale(locale);
        config.setLayoutDirection(locale);
        resources.updateConfiguration(config, resources.getDisplayMetrics());
        createConfigurationContext(config);
    }
    
    /**
     * Set the app language and save preference
     */
    public void setAppLanguage(String languageCode) {
        SharedPreferences settings = getSharedPreferences("ClientInfo", MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();
        
        if (languageCode == null || languageCode.isEmpty()) {
            editor.remove("Language");
        } else {
            editor.putString("Language", languageCode);
        }
        
        editor.apply();
    }
    
    /**
     * Configure the status bar for edge-to-edge display
     */
    private void configureStatusBar() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        );
        
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
    }
    
    @Override
    public void onBackPressed() {
        // Show exit confirmation dialog
        AlertDialog.Builder builder = new AlertDialog.Builder(this)
            .setIcon(android.R.drawable.ic_dialog_alert)
            .setTitle(R.string.str_title_exit_app)
            .setMessage(R.string.str_question_exit_app)
            .setPositiveButton(R.string.yes, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                }
            })
            .setNegativeButton(R.string.no, null);
        
        AlertDialog dialog = builder.create();
        dialog.show();
    }
}
