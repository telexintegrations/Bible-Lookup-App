export const integrationSpec = {
    "data": {
        "date": {
        "created_at": "2025-02-21",
        "updated_at": "2025-02-21"
    }, 
    "descriptions": {
        "app_description": "Automatically replaces Bible references with their passages/texts.",
        "app_logo": "https://toppng.com/uploads/preview/clip-free-clipart-open-bible-bible-on-white-background-115630054979wbeso9kz3.png",
        "app_name": "Bible Lookup",
        "app_url": "https://hng12-stage3-telex-integration-bible-lookup-app.vercel.app",
        "background_color": "#000000"
    },
    "integration_category": 
    "Performance Monitoring",
    "integration_type": "modifier",
    "is_active": true,
    "output": [],
    "key_features": [
        "Bible Search",
        "Bible Replace"
    ],
    "author": "Joeonome",
    "permissions": {},
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
      "target_url": "https://hng12-stage3-telex-integration-bible-lookup-app.vercel.app/webhook",
      "tick_url": "https://hng12-stage3-telex-integration-bible-lookup-app.vercel.app/tick_url"
    }
  } 