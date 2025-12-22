# Server ဖွင့်နည်း - Step by Step Guide

## Method 1: Command Prompt/Terminal သုံးပြီး (Recommended)

### Step 1: Project Folder ကို Open လုပ်ပါ
1. File Explorer ဖွင့်ပါ
2. `D:\Downloads\Old` folder ကို သွားပါ

### Step 2: Command Prompt ဖွင့်ပါ
1. Project folder ထဲမှာ right-click လုပ်ပါ
2. "Open in Terminal" သို့မဟုတ် "Open PowerShell window here" ကို ရွေးပါ
   - သို့မဟုတ်
3. Windows Key + R နှိပ်ပါ
4. `cmd` ရိုက်ပြီး Enter နှိပ်ပါ
5. `cd D:\Downloads\Old` ရိုက်ပြီး Enter နှိပ်ပါ

### Step 3: Dependencies Install လုပ်ပါ (ပထမဆုံးအကြိမ်သာ)
```bash
npm install
```
- ဒါက dependencies တွေ install လုပ်ပေးပါတယ်
- ပထမဆုံးအကြိမ်သာ run ရပါတယ်

### Step 4: .env File စစ်ဆေးပါ
1. `.env` file ရှိမရှိ စစ်ဆေးပါ
2. မရှိရင်:
   ```bash
   copy env.example .env
   ```
3. `.env` file ကို text editor နဲ့ ဖွင့်ပြီး Firebase credentials တွေ ထည့်ပါ

### Step 5: Server ကို Start လုပ်ပါ
```bash
npm start
```
သို့မဟုတ်
```bash
node server.js
```

### Step 6: Server Running ကို စစ်ဆေးပါ
- Terminal/Command Prompt မှာ ဒီလို message ပေါ်ရပါမယ်:
  ```
  Server running on port 3000
  Visit: http://localhost:3000
  ```

### Step 7: Browser မှာ Open လုပ်ပါ
1. Browser ဖွင့်ပါ (Chrome, Firefox, Edge, etc.)
2. Address bar မှာ ရိုက်ပါ:
   ```
   http://localhost:3000
   ```
3. Website ပေါ်လာရပါမယ်

### Step 8: Admin Login သွားပါ
1. Browser address bar မှာ ရိုက်ပါ:
   ```
   http://localhost:3000/admin/login
   ```
2. Login credentials:
   - **Email:** `admin@aisolutions.com`
   - **Password:** `admin123`

---

## Method 2: start.bat File သုံးပြီး (Windows Only)

### Step 1: start.bat File ကို Double-click လုပ်ပါ
1. `D:\Downloads\Old` folder ထဲမှာ `start.bat` file ကို ရှာပါ
2. Double-click လုပ်ပါ
3. Command Prompt window ပေါ်လာပါမယ်
4. Server automatically start ဖြစ်ပါမယ်

---

## Server ကို Stop လုပ်နည်း

1. Command Prompt/Terminal window ကို focus လုပ်ပါ
2. `Ctrl + C` နှိပ်ပါ
3. Server stop ဖြစ်ပါမယ်

---

## Troubleshooting

### Error: "node is not recognized"
- **Solution:** Node.js install မလုပ်ထားသေးပါ
- Node.js download လုပ်ပါ: https://nodejs.org/
- Install လုပ်ပြီး computer ကို restart လုပ်ပါ

### Error: "Cannot find module"
- **Solution:** Dependencies install မလုပ်ထားသေးပါ
- Run: `npm install`

### Error: "Port 3000 is already in use"
- **Solution:** Port 3000 ကို အခြား program က သုံးနေပါတယ်
- `.env` file မှာ `PORT=3001` (သို့မဟုတ် အခြား port number) ထည့်ပါ
- Server ကို restart လုပ်ပါ

### Error: "Firebase connection failed"
- **Solution:** `.env` file မှာ Firebase credentials တွေ မှန်ကန်စွာ ထည့်ထားရပါမယ်
- `env.example` file ကို ကြည့်ပြီး required fields တွေ ထည့်ပါ

---

## Quick Commands Summary

```bash
# Dependencies install
npm install

# Server start
npm start

# Server start (alternative)
node server.js

# Development mode (auto-restart on file changes)
npm run dev
```

---

## Server URLs

- **Main Website:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard
- **Contact Form:** http://localhost:3000/contact.html

---

## Notes

- Server running နေစဉ် Command Prompt window ကို ပိတ်လို့ မရပါ
- Server stop လုပ်ချင်ရင် `Ctrl + C` နှိပ်ပါ
- Development mode သုံးချင်ရင် `npm run dev` run ပါ (file changes တွေကို auto-detect လုပ်ပါမယ်)

