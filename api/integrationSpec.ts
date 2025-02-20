export const integrationSpec = {
    "data": {
        "date": {
        "created_at": "2025-02-20",
        "updated_at": "2025-02-20"
    }, 
    "descriptions": {
        "app_description": "Automatically replaces Bible references with their messages/texts.",
        "app_logo": "https://toppng.com/uploads/preview/clip-free-clipart-open-bible-bible-on-white-background-115630054979wbeso9kz3.png",
        "app_name": "Bible Lookup.",
        "app_url": "URL to the application or service.",
        "background_color": "#000000"
    },
    "integration_category": 
    "Performance Monitoring",
    "integration_type": "modifier",
    "is_active": false,
    "output": [
        {
            "label": "output_channel_1",
            "value": true
        },
        {
            "label": "output_channel_2",
            "value": false
        }
    ],
    "key_features": [
        "Feature description 1.",
        "Feature description 2.",
        "Feature description 3.",
        "Feature description 4."
    ],
    "permissions": {
        "monitoring_user": {
            "always_online": true,
            "display_name": "Performance Monitor"
        }
    },
      "settings": [
        {
          "label": "Gender",
          "type": "radio",
          "required": true,
          "default": "Female",
          "options": ["Male", "Female"]
        },
        {
          "label": "Key",
          "type": "text",
          "required": true,
          "default": "1234567890"
        },
        {
          "label": "Do you want to continue",
          "type": "checkbox",
          "required": true,
          "default": "Yes"
        },
        {
          "label": "Provide Speed",
          "type": "number",
          "required": true,
          "default": "1000"
        },
        {
          "label": "Sensitivity Level",
          "type": "dropdown",
          "required": true,
          "default": "Low",
          "options": ["High", "Low"]
        },
        {
          "label": "Alert Admin",
          "type": "multi-checkbox",
          "required": true,
          "default": "Super-Admin",
          "options": ["Super-Admin", "Admin", "Manager", "Developer"]
        }
      ],
      "target_url": "URL for integration or service."
    }
  } 