# PowerShell ကနေ Server Start လုပ်နည်း (ရိုးရှင်းတဲ့နည်း)

## အလွယ်ဆုံးနည်း:

### Step 1: PowerShell ဖွင့်ပါ
- Windows Key + X → "Windows PowerShell" ရွေးပါ
- သို့မဟုတ် Windows Key + R → `powershell` → Enter

### Step 2: Project Folder သွားပါ
```powershell
cd D:\Downloads\Old
```

### Step 3: Server Start လုပ်ပါ
```powershell
node server.js
```

ဒါပဲ! Server start ဖြစ်ပါမယ်!

---

## သို့မဟုတ် Script File Run လုပ်ပါ:

### Method 1: Script File Run
```powershell
cd D:\Downloads\Old
.\start-server.ps1
```

### Method 2: One Line
```powershell
cd D:\Downloads\Old; .\start-server.ps1
```

### Method 3: File Explorer ကနေ
1. `start-server.ps1` file ကို right-click
2. "Run with PowerShell" ရွေးပါ

---

## Server Start ပြီးရင်:

Browser မှာ:
- `http://localhost:3000` - Website
- `http://localhost:3000/admin/login` - Admin Login

Login:
- Email: `admin@aisolutions.com`
- Password: `admin123`

---

## Server Stop:
PowerShell window မှာ `Ctrl + C` နှိပ်ပါ

---

## Quick Commands:

```powershell
# Server start
cd D:\Downloads\Old
node server.js

# သို့မဟုတ်
cd D:\Downloads\Old; node server.js
```

