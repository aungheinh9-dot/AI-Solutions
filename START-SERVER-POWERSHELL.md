# PowerShell ကနေ Server Start လုပ်နည်း

## Method 1: PowerShell Script File ကို Run လုပ်ပါ (အလွယ်ဆုံး)

### Step 1: PowerShell ဖွင့်ပါ
1. Windows Key + X နှိပ်ပါ
2. "Windows PowerShell" သို့မဟုတ် "Terminal" ကို ရွေးပါ
   - သို့မဟုတ်
3. Windows Key + R နှိပ်ပါ
4. `powershell` ရိုက်ပြီး Enter နှိပ်ပါ

### Step 2: Project Folder သွားပါ
```powershell
cd D:\Downloads\Old
```

### Step 3: Script Run လုပ်ပါ
```powershell
.\start-server.ps1
```

---

## Method 2: Execution Policy Bypass နဲ့ Run လုပ်ပါ

Execution policy error ရရင်:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

---

## Method 3: File Explorer ကနေ Run လုပ်ပါ

1. File Explorer ဖွင့်ပါ
2. `D:\Downloads\Old` folder သွားပါ
3. `start-server.ps1` file ကို right-click လုပ်ပါ
4. "Run with PowerShell" ကို ရွေးပါ

---

## Method 4: Double-Click လုပ်ပါ (Shortcut)

1. `start-server.ps1` file ကို right-click လုပ်ပါ
2. "Open with" → "Choose another app" ကို ရွေးပါ
3. "PowerShell" ကို ရွေးပြီး "Always use this app" check လုပ်ပါ
4. နောက်တစ်ခါ `start-server.ps1` file ကို double-click လုပ်ရုံပါပဲ

---

## Quick Start Command (One Line)

PowerShell မှာ ဒီ command တစ်ခုတည်း run လုပ်ပါ:

```powershell
cd D:\Downloads\Old; powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

---

## Server Start ပြီးရင်:

✅ Server running message ပေါ်လာရပါမယ်:
```
========================================
   ✅ Server is running!
========================================

🌐 Website: http://localhost:3000
🔐 Admin Login: http://localhost:3000/admin/login

📝 Admin Credentials:
   Email: admin@aisolutions.com
   Password: admin123
```

---

## Browser မှာ Open လုပ်ပါ:

1. Browser ဖွင့်ပါ (Chrome, Firefox, Edge, etc.)
2. Address bar မှာ ရိုက်ပါ:
   ```
   http://localhost:3000
   ```
3. Admin login သွားရင်:
   ```
   http://localhost:3000/admin/login
   ```

---

## Server Stop လုပ်နည်း:

PowerShell window မှာ:
- `Ctrl + C` နှိပ်ပါ

---

## Troubleshooting

### Error: "execution of scripts is disabled"
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
ပြီးရင် script ကို ထပ် run လုပ်ပါ

### Error: "node is not recognized"
**Solution:** Node.js install မလုပ်ထားသေးပါ
- Download: https://nodejs.org/
- Install လုပ်ပြီး computer restart လုပ်ပါ

### Error: "Cannot find module"
**Solution:** Dependencies install မလုပ်ထားသေးပါ
```powershell
npm install
```

### Port 3000 already in use
**Solution:** Port 3000 ကို အခြား program က သုံးနေပါတယ်
- `.env` file မှာ `PORT=3001` ထည့်ပါ
- Server ကို restart လုပ်ပါ

---

## Notes

- PowerShell window ကို server running နေစဉ် ပိတ်လို့ မရပါ
- Server stop လုပ်ချင်ရင် `Ctrl + C` နှိပ်ပါ
- Multiple PowerShell windows ဖွင့်ထားလို့ ရပါတယ်

