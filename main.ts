function ButtonClicks () {
    if (inDesktop()) {
        if (OnButton(MDDOSappslot1x, MDDOSappslot1y, 16, 16)) {
            LaunchApp("Settings")
        }
    }
    if (OnButton(5, 102, 16, 16)) {
        if (!(MDDOSStartmenuopen)) {
            Startmenu("--open")
        } else if (MDDOSStartmenuopen) {
            Startmenu("--close")
        }
    }
    if (MDDOSappopen) {
        if (OnButton(148, 2, 9, 9)) {
            CloseApp(MDDOScurrentopenapp)
        }
    }
    if (MDDSYSPowerMenuopen) {
        if (OnButton(47, 35, 65, 19)) {
            power.fullPowerOn(FullPowerSource.P2)
            power.lowPowerEnable(LowPowerEnable.Allow)
            power.lowPowerRequest(LowPowerMode.Wait)
        } else if (OnButton(47, 57, 65, 19)) {
            power.fullPowerOn(FullPowerSource.P2)
            power.lowPowerEnable(LowPowerEnable.Allow)
            power.lowPowerPause(500)
        } else if (OnButton(47, 79, 65, 19)) {
            power.fullPowerOn(FullPowerSource.A)
            power.lowPowerEnable(LowPowerEnable.Allow)
            power.lowPowerRequest(LowPowerMode.Wait)
        }
    }
    if (MDDOSStartmenuopen) {
        if (OnButton(140, 80, 16, 16)) {
            if (!(MDDSYSPowerMenuopen)) {
                PowerMenu("--open")
            } else if (MDDSYSPowerMenuopen) {
                PowerMenu("--close")
            }
        }
    }
}
function DrawAppSettings () {
    MDDOSappssettingscurrentpage = "about"
    screen().fill(1)
    screen().drawLine(50, 0, 50, 200, 11)
    DrawAppSettingsHovers()
    DrawAppSettingsMenus()
    screen().drawTransparentBitmap(MDDOSiconsappssettingsabout, 0, 17)
    screen().print("About", 10, 17, 15)
    screen().drawLine(0, 30, 50, 30, 11)
}
function CloseApp (app: string) {
    if (app == "Settings") {
        MDDOSappssettingsopen = false
    }
    MDDOSappopen = false
}
controller.onShieldEvent(ControllerShieldEvent.Absent, function () {
    MDDSYSPostDisplay_Shield = false
})
function DrawKioskBars () {
    screen().fillRect(0, 0, 160, 13, 8)
    screen().fillRect(0, 100, 160, 20, 15)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ButtonClicks()
})
function StartDesktop () {
    MDDSYSRenderallow = true
    screen().drawBitmap(MDDOSimagesbackground, 0, 0)
}
bluetooth.onBluetoothConnected(function () {
    if (MDDSYSbleon && MDDOSbleconnected) {
        StartDesktop()
        MDDSYSbleon = false
    }
    basic.pause(100)
    MDDOSbleconnected = true
})
function SysErr (error: string, flags: string) {
    if (flags == "--render") {
        screen().fill(15)
        logAPI("", "--reset")
        logAPI("MDD crashed :(", "--error")
        logAPI("ERR: " + error, "--error")
    } else {
        MDDSYSSysErrorError = error
        MDDSYSOverride_Render_Error = true
    }
}
function Assets () {
    Images()
    Text()
}
function OnButton (x: number, y: number, w: number, h: number) {
    MDDOSOnButtonc1x = x
    MDDOSOnButtonc1y = y
    MDDOSOnButtonc2x = x + w
    MDDOSOnButtonc2y = y
    MDDOSOnButtonc3x = x + w
    MDDOSOnButtonc3y = y + h
    MDDOSOnButtonc4x = x
    MDDOSOnButtonc4y = y + h
    if (MDDOSmousex >= MDDOSOnButtonc1x && MDDOSmousex <= MDDOSOnButtonc2x && (MDDOSmousey >= MDDOSOnButtonc1y && MDDOSmousey <= MDDOSOnButtonc3y)) {
        return true
    } else {
        return false
    }
}
controller.onShieldEvent(ControllerShieldEvent.Present, function () {
    MDDSYSPostDisplay_Shield = true
})
bluetooth.onBluetoothDisconnected(function () {
    MDDOSbleconnected = false
})
input.onButtonPressed(Button.A, function () {
    if (MDDSYSbleon) {
        StartDesktop()
    }
})
function SaveData (hash: number, perms_level: number) {
    MDDSYSslots1[0] = MDDSYSsetupcomplete
    for (let value of MDDSYSslots1) {
        MDDSYSslotscsv = "" + MDDSYSslotscsv + value + ","
    }
    flashstorage.put("Partion 1", MDDSYSslotscsv)
    MDDSYSslotscsv = ""
    for (let value2 of MDDSYSslots2) {
        MDDSYSslotscsv = "" + MDDSYSslotscsv + value2 + ","
    }
    flashstorage.put("Partion 2", MDDSYSslotscsv)
    MDDSYSslotscsv = ""
    for (let value3 of MDDSYSslots3) {
        MDDSYSslotscsv = "" + MDDSYSslotscsv + value3 + ","
    }
    flashstorage.put("Partion 3", MDDSYSslotscsv)
    MDDSYSslotscsv = ""
    for (let value4 of MDDSYSslots4) {
        MDDSYSslotscsv = "" + MDDSYSslotscsv + value4 + ","
    }
    flashstorage.put("Partion 4", MDDSYSslotscsv)
    MDDSYSslotscsv = ""
    for (let value5 of MDDSYSslots5) {
        MDDSYSslotscsv = "" + MDDSYSslotscsv + value5 + ","
    }
    flashstorage.put("Partion 5", MDDSYSslotscsv)
    MDDSYSslotscsv = ""
}
function StartBLE () {
    MDDSYSbleon = true
    screen().printCenter("Go to", 17, 15)
    screen().printCenter("https://jxoj.github.io/MDD", 25, 15)
    screen().printCenter("on a computer", 33, 15)
    screen().printCenter("A to skip", 41, 15)
    screen().printCenter("(Microbit Button)", 48, 15)
}
function Render (flags: string, args: string) {
    if (flags == "--bootsequence") {
        logAPI("Firmware: " + MDDSYSfirm_type, "")
        POST("")
        basic.pause(2000)
        screen().fill(1)
        screen().drawTransparentBitmap(MDDSYSboot_icon, 45, 10)
        screen().drawRect(36, 70, 80, 10, 15)
        MDDSYSload_ = 0
        if (args == "--skip-load") {
            Render("--auth", "")
        } else if (args == "--desktop-test") {
            Render("--auth", "--skip")
        } else if (args == "--demo") {
            for (let index = 0; index < 80; index++) {
                basic.pause(100)
                screen().fillRect(36, 70, MDDSYSload_, 10, 15)
                MDDSYSload_ += 1
            }
            basic.pause(100)
            Render("--auth", "--skip")
        } else {
            for (let index = 0; index < 80; index++) {
                basic.pause(100)
                screen().fillRect(36, 70, MDDSYSload_, 10, 15)
                MDDSYSload_ += 1
            }
            basic.pause(100)
            Render("--auth", "")
        }
    } else if (flags == "--error") {
        SysErr(args, "--render")
    } else if (flags == "--auth") {
        if (args == "--skip") {
            StartDesktop()
        } else {
            screen().fill(1)
            screen().printCenter("Starting BLE", 10, 15)
            StartBLE()
        }
    } else if (flags == "--kiosk-app") {
        DrawAppsLogic()
        if (MDDSYSkioskbars) {
            DrawKioskBars()
        }
        DrawMouse()
    } else if (flags == "--start-kiosk") {
        MDDSYSKiosk_App = true
        if (MDDSYSSelectedKiosk_App.includes("[Bars]")) {
            MDDSYSRenderstart_kioskarray = MDDSYSSelectedKiosk_App.split("[")
            MDDSYSRenderstart_kioskarray.pop()
            MDDSYSSelectedKiosk_App = MDDSYSRenderstart_kioskarray[0]
            MDDSYSkioskbars = true
            LaunchApp(MDDSYSSelectedKiosk_App)
        } else {
            LaunchApp(MDDSYSSelectedKiosk_App)
        }
    } else {
        DrawDesktop()
        DrawApps()
        if (MDDOSStartmenuopen) {
            Startmenu("--render")
        }
        if (MDDSYSPowerMenuopen) {
            PowerMenu("--render")
        }
        DrawTaskbar()
        DrawMouse()
    }
}
function Auth (flags: string, args: string) {
    if (flags == "--kernel") {
        if (args == "gethash") {
            MDDSYStempkernel_hash = "" + convertToText(randint(0, 9)) + convertToText(randint(0, 9)) + convertToText(randint(0, 9)) + convertToText(randint(0, 9)) + convertToText(randint(0, 9))
            return parseFloat(MDDSYStempkernel_hash)
        }
    }
    return 0
}
function LoadData () {
    MDDSYSslots1 = flashstorage.get("Slot1").split(",")
    MDDSYSslots2 = flashstorage.get("Slot2").split(",")
    MDDSYSslots3 = flashstorage.get("Slot3").split(",")
    MDDSYSslots4 = flashstorage.get("Slot4").split(",")
    MDDSYSslots5 = flashstorage.get("Slot5").split(",")
    MDDSYSsetupcomplete = MDDSYSslots1.removeAt(0)
}
function Startmenu (flags: string) {
    if (flags == "--render") {
    	
    } else if (flags == "--open") {
        MDDOSStartmenuopen = true
    } else if (flags == "--close") {
        MDDOSStartmenuopen = false
    }
}
function DefaultVars () {
    MDDSYSkioskbars = false
    MDDSYSKiosk_App = false
    MDDSYSPowerMenuopen = false
    MDDOSappopen = false
    MDDOSappssettingsopen = false
    MDDOSappsslot1 = "Settings"
    MDDOSappsslot1bp = MDDOSiconssettings
    MDDOSappslot1y = 10
    MDDOSappslot1x = 10
    MDDSYSRenderallow = false
    MDDOSbleconnected = false
    MDDSYSOverride_Render_Error = false
    MDDSYSsys_ver = "Dev 1"
    MDDSYSboot_icon = bmp`
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ...........555555555555555555555555555555555555555555...........
        ...........555555555555555555555555555555555555555555...........
        ...........555555555555555555555555555555555555555555...........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ........555fffffff55555555ffffffffffff55555555fffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555ffffff5555555555ffffffffff5555555555ffffff555........
        ........555fffffff55555555ffffffffffff55555555fffffff555........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ........555ffffffffffffffffffffffffffffffffffffffffff555........
        ...........555555555555555555555555555555555555555555...........
        ...........555555555555555555555555555555555555555555...........
        ...........555555555555555555555555555555555555555555...........
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        ................................................................
        `
    MDDSYSlogAPIcurrent_line = 0
}
function Filesystem (flags: string, args: string, args2: string, hash: number, perms_level: number) {
    if (flags == "--saveflash") {
        if (permsAPI("--check", perms_level, hash) == "true") {
            SaveData(hash, 0)
        }
    } else if (flags == "--loadflash") {
        LoadData()
    } else {
    	
    }
}
function PowerMenu (flags: string) {
    if (flags == "--render") {
        screen().fillRect(45, 25, 70, 100, 12)
        screen().print("Power Menu", 50, 26, 1)
        screen().drawRect(47, 35, 65, 19, 15)
        if (MDDSYSPowerMenuopen) {
            if (OnButton(47, 35, 65, 19)) {
                screen().fillRect(47, 35, 65, 19, 15)
            }
        }
        screen().drawTransparentBitmap(MDDOSiconspower, 48, 36)
        screen().print("Off", 75, 40, 1)
        screen().drawRect(47, 57, 65, 19, 15)
        if (MDDSYSPowerMenuopen) {
            if (OnButton(47, 57, 65, 19)) {
                screen().fillRect(47, 57, 65, 19, 15)
            }
        }
        screen().drawTransparentBitmap(MDDOSiconsrestart, 48, 58)
        screen().print("Restart", 67, 62, 1)
        screen().drawRect(47, 79, 65, 19, 15)
        if (MDDSYSPowerMenuopen) {
            if (OnButton(47, 79, 65, 19)) {
                screen().fillRect(47, 79, 65, 19, 15)
            }
        }
        screen().drawTransparentBitmap(MDDOSiconssleep, 48, 80)
        screen().print("Sleep", 70, 83, 1)
    } else if (flags == "--open") {
        MDDSYSPowerMenuopen = true
    } else if (flags == "--close") {
        MDDSYSPowerMenuopen = false
    }
}
function DrawMouse () {
    if (controller.up.isPressed()) {
        MDDOSmousey += -1
    } else if (controller.down.isPressed()) {
        MDDOSmousey += 1
    } else if (controller.right.isPressed()) {
        MDDOSmousex += 1
    } else if (controller.left.isPressed()) {
        MDDOSmousex += -1
    }
    screen().drawTransparentBitmap(MDDOSiconscursor, MDDOSmousex, MDDOSmousey)
}
function Boot (flags: string) {
    LoadData()
    Assets()
    DefaultVars()
    POST("--init")
    if (flags == "--kiosk-app") {
        Render("--start-kiosk", "")
    } else {
        Render("--bootsequence", flags)
    }
}
function POST (flags: string) {
    if (flags == "--init") {
        if (parseFloat(control.hardwareVersion()) == 2) {
            MDDSYSfirm_type = "UEFI"
        } else if (parseFloat(control.hardwareVersion()) == 1) {
            MDDSYSfirm_type = "BIOS"
        } else {
            SysErr("ctrl.hwVER() returned Invaild", "")
        }
    } else {
        logAPI("POST:", "--extraline")
        basic.pause(100)
        logAPI("Display Shield: " + MDDSYSPostDisplay_Shield, "")
        if (!(MDDSYSPostDisplay_Shield)) {
            SysErr("No display shield", "")
        }
        logAPI("System Version: " + MDDSYSsys_ver, "")
        if (MDDSYSsys_ver.includes("Alpha")) {
            logAPI("Warn: This is a very early ", "--warn")
            logAPI("release so expect bugs", "--warn")
        } else if (MDDSYSsys_ver.includes("Beta")) {
            logAPI("Warn: This is stable", "--warn")
            logAPI("-ish release", "--warn")
        } else if (MDDSYSsys_ver.includes("Dev")) {
            logAPI("Warn: This is a dev", "--warn")
            logAPI("release it is currently ", "--warn")
            logAPI("being developed", "--warn")
        } else {
        	
        }
    }
}
function LaunchAppLogic (app: string) {
    if (app == "Settings") {
        MDDOSappssettingsopen = true
        MDDOScurrentopenapp = "Settings"
    }
}
function inDesktop () {
    if (!(MDDOSStartmenuopen)) {
        if (MDDSYSRenderallow) {
            if (MDDOSappopen) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    } else {
        return false
    }
}
function DrawAppsLogic () {
    if (MDDOSappssettingsopen) {
        DrawAppSettings()
    }
}
function DrawTaskbar () {
    screen().fillRect(0, 100, 160, 20, 15)
    if (OnButton(5, 102, 16, 16)) {
        screen().fillRect(5, 102, 16, 16, 1)
        screen().drawTransparentBitmap(MDDOSiconstart, 5, 102)
    } else {
        screen().drawTransparentBitmap(MDDOSiconstart, 5, 102)
    }
    if (MDDOSbleconnected) {
        if (OnButton(145, 105, 8, 8)) {
            screen().drawTransparentBitmap(MDDOSiconsble, 145, 105)
            screen().print("BLE: on", 115, 90, 1)
        } else {
            screen().drawTransparentBitmap(MDDOSiconsble, 145, 105)
        }
    }
}
function ChannelLog () {
    MDDOSchannellog_lines = 2
    MDDOSchannellog = []
    MDDOSchannellog.push("Added About")
    MDDOSchannellog.push("to Settings App")
}
function logAPI (text: string, flags: string) {
    if (flags.includes("--reset")) {
        MDDSYSlogAPIcurrent_line = 0
    } else if (flags.includes("--error")) {
        screen().print(text, 1, MDDSYSlogAPIcurrent_line, 2)
        MDDSYSlogAPIcurrent_line += 7
    } else if (flags.includes("--extraline")) {
        screen().print(text, 1, MDDSYSlogAPIcurrent_line + 7, 1)
        MDDSYSlogAPIcurrent_line += 14
    } else if (flags.includes("--warn")) {
        screen().print(text, 1, MDDSYSlogAPIcurrent_line, 5)
        MDDSYSlogAPIcurrent_line += 7
    } else {
        screen().print(text, 1, MDDSYSlogAPIcurrent_line, 1)
        MDDSYSlogAPIcurrent_line += 7
    }
}
function permsAPI (flags: string, perms_level: number, hash: number) {
    if (flags == "--check") {
        if (perms_level == 0) {
            return "basic_read"
        } else if (perms_level == 1) {
            return "basic_read&write"
        } else if (perms_level == 2) {
            if (hash == MDDSYStempfull_hash) {
                return "os_read"
            } else {
                return "err_incorrect_hash"
            }
        } else if (perms_level == 3) {
            if (hash == MDDSYStempfull_hash) {
                return "os_read&write"
            } else {
                return "err_incorrect_hash"
            }
        }
    } else if (flags == "--regenhash") {
        if (hash == MDDSYStempfull_hash) {
            return convertToText(parseFloat("" + Auth("--kernel", "gethash") * 798 + parseFloat(MDDOSos_hash) * Auth("--kernel", "gethash")) * 555375)
        }
    }
    return "null"
}
function DrawDesktop () {
    screen().drawBitmap(MDDOSimagesbackground, 0, 0)
    DrawDesktopApps()
}
function Text () {
    ChannelLog()
}
function DrawApps () {
    DrawAppsLogic()
    if (MDDOSappopen) {
        screen().fillRect(0, 0, 160, 13, 8)
        if (OnButton(148, 2, 9, 9)) {
            screen().fillRect(148, 2, 9, 9, 1)
            screen().drawTransparentBitmap(MDDOSiconsredx, 148, 2)
        } else {
            screen().drawTransparentBitmap(MDDOSiconsredx, 148, 2)
        }
        screen().print(MDDOScurrentopenapp, 2, 2, 1)
    }
}
function Kernel (flags: string, args: string, args2: string, args3: string, perms_level: number, hash: string) {
    MDDSYStempfull_hash = parseFloat("" + Auth("--kernel", "gethash") * 798 + parseFloat(MDDOSos_hash) * Auth("--kernel", "gethash")) * 555375
    MDDSYStempfull_hash = parseFloat(permsAPI("--regenhash", 0, MDDSYStempfull_hash))
    if (flags == "--filesystem") {
        if (permsAPI("--check", perms_level, parseFloat(hash)) == "true") {
            Filesystem(args, args2, args3, MDDSYStempfull_hash, perms_level)
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(MDDOSStartmenuopen)) {
        Startmenu("--open")
    } else if (MDDOSStartmenuopen) {
        Startmenu("--close")
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    MDDSYSserialline = serial.readUntil(serial.delimiters(Delimiters.Hash))
    MDDOSPnP("--check")
})
function DrawAppSettingsHovers () {
    if (OnButton(1, 15, 40, 12)) {
        screen().drawRect(1, 15, 40, 12, 12)
    }
}
function Test () {
    StartDesktop()
}
function MDDOSPnP (flags: string) {
    if (flags == "--check") {
        if (MDDSYSserialline.includes("PnP") && MDDSYSserialline.includes("type:drive")) {
            serial.writeLine("PnP Name#")
            basic.pause(100)
            MDDOSPnPcurrent_device_name = MDDSYSserialline
        } else if (MDDSYSserialline.includes("PnP") && MDDSYSserialline.includes("type:radio")) {
        	
        } else if (MDDSYSserialline.includes("PnP") && MDDSYSserialline.includes("type:drive")) {
        	
        } else if (false) {
        	
        } else {
        	
        }
    } else if (flags == "--turnon") {
        serial.redirect(
        SerialPin.P0,
        SerialPin.P1,
        BaudRate.BaudRate115200
        )
    } else if (flags == "--turnoff") {
        serial.redirectToUSB()
    }
}
function Icons () {
    MDDOSiconsble = bmp`
        9 . . 9 9 9 9 . 
        . 9 . 9 . . . 9 
        . . 9 9 . . . 9 
        . . . 9 9 9 9 . 
        . . . 9 9 9 9 . 
        . . 9 9 . . . 9 
        . 9 . 9 . . . 9 
        9 . . 9 9 9 9 . 
        `
    MDDOSiconscursor = bmp`
        f f f f f f . . . . . . . . . . 
        f 1 1 1 1 1 f f f f . . . . . . 
        f 1 1 1 1 1 1 1 1 1 f f f f f . 
        f 1 1 1 1 1 1 1 1 1 1 1 1 f f f 
        f 1 1 1 1 1 1 1 1 1 1 f f . . . 
        f 1 1 1 1 1 1 1 f f f . . . . . 
        . f 1 1 1 1 1 f . . . . . . . . 
        . f 1 1 1 1 f . . . . . . . . . 
        . f 1 1 1 f . . . . . . . . . . 
        . f 1 1 1 f . . . . . . . . . . 
        . . f 1 1 f . . . . . . . . . . 
        . . f 1 f . . . . . . . . . . . 
        . . f 1 f . . . . . . . . . . . 
        . . f f . . . . . . . . . . . . 
        . . f f . . . . . . . . . . . . 
        . . . f . . . . . . . . . . . . 
        `
    MDDOSiconstart = bmp`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 f f f f f f f f f f f f f f 5 
        5 f f f 5 5 f f f f 5 5 f f f 5 
        5 f f 5 5 5 5 f f 5 5 5 5 f f 5 
        5 f f 5 5 5 5 f f 5 5 5 5 f f 5 
        5 f f f 5 5 f f f f 5 5 f f f 5 
        5 f f f f f f f f f f f f f f 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    MDDOSiconssettings = bmp`
        c c . . . . c c c c . . . . c c 
        c c c . . . c c c c . . . c c c 
        . c c c c c c c c c c c c c c . 
        . . c c c c c c c c c c c c . . 
        . . c c c c c 1 1 c c c c c . . 
        . . c c c c 1 8 8 1 c c c c . . 
        c c c c c 1 8 8 8 8 1 c c c c c 
        c c c c 1 8 8 8 8 8 8 1 c c c c 
        c c c c 1 8 8 8 8 8 8 1 c c c c 
        c c c c c 1 8 8 8 8 1 c c c c c 
        . . c c c c 1 8 8 1 c c c c . . 
        . . c c c c c 1 1 c c c c c . . 
        . . c c c c c c c c c c c c . . 
        . c c c c c c c c c c c c c c . 
        c c c . . . c c c c . . . c c c 
        c c . . . . c c c c . . . . c c 
        `
    MDDOSiconsredx = bmp`
        2 . . . . . . . 2 
        . 2 . . . . . 2 . 
        . . 2 . . . 2 . . 
        . . . 2 . 2 . . . 
        . . . . 2 . . . . 
        . . . 2 . 2 . . . 
        . . 2 . . . 2 . . 
        . 2 . . . . . 2 . 
        2 . . . . . . . 2 
        `
    MDDOSiconspower = bmp`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . 1 . . 1 1 . . 1 . . . . 
        . . . 1 . . . 1 1 . . . 1 . . . 
        . . 1 . . . . 1 1 . . . . 1 . . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . 1 . . . . . 1 1 . . . . . 1 . 
        . . 1 . . . . . . . . . . 1 . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    MDDOSiconsrestart = bmp`
        . . . . . . . . . . . . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . 1 . . . . . . . . . . 1 . . 
        . 1 . . . . . . . . . . . . 1 . 
        . 1 . . . . . . . . . . . . 1 . 
        . 1 . . . . . . . . . . . . 1 . 
        . 1 . . . . . . . . . . . . 1 . 
        . 1 . . . . . . . . . 1 . . 1 . 
        . 1 . . . . . . . . . 1 . . 1 . 
        . . 1 . . . . . . . . 1 . 1 . . 
        . . . 1 . . . . . . . 1 1 . . . 
        . . . . 1 . . . . . . 1 1 1 1 1 
        . . . . . 1 1 1 1 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    MDDOSiconssleep = bmp`
        . . . . . . . . . . . . . . . . 
        . . . . . 1 1 1 1 1 . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . 1 1 1 1 1 . . . . . . . . 
        . . 1 1 1 1 1 . . 1 1 1 1 1 1 . 
        . 1 1 1 1 1 . . . . . . . . 1 . 
        . 1 1 1 1 1 . . . . . . . 1 . . 
        . 1 1 1 1 1 . . . . . . 1 . . . 
        . 1 1 1 1 1 . . . . . 1 . . . . 
        . 1 1 1 1 1 . . . . 1 . . . . . 
        . 1 1 1 1 1 . . . 1 . . . . . . 
        . . 1 1 1 1 1 . . 1 1 1 1 1 1 . 
        . . . 1 1 1 1 1 . . . . . . . . 
        . . . . 1 1 1 1 1 . . . . . . . 
        . . . . . 1 1 1 1 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    MDDOSiconsappssettingsabout = bmp`
        . . . f f . . . 
        . . . f f . . . 
        . . . . . . . . 
        . . . f f . . . 
        . . . f f . . . 
        . . . f f . . . 
        . . . f f . . . 
        . . . f f . . . 
        `
}
function DrawAppSettingsMenus () {
    if (MDDOSappssettingscurrentpage == "about") {
        screen().drawRect(1, 15, 40, 12, 15)
        screen().drawTransparentBitmap(MDDSYSboot_icon, 70, -5)
        screen().print("MDD OS " + MDDSYSsys_ver, 70, 40, 15)
        screen().print("Channel Log:", 69, 54, 15)
        MDDOSappssettingsprint_channellog_lines = 0
        MDDOSappssettingschannellog_lines_y = 0
        for (let index = 0; index < MDDOSchannellog_lines; index++) {
            MDDOSappssettingschannellog_lines_y += 10
            screen().print(MDDOSchannellog[MDDOSappssettingsprint_channellog_lines], 55, 54 + MDDOSappssettingschannellog_lines_y, 15)
            MDDOSappssettingsprint_channellog_lines += 1
        }
    }
}
function Images () {
    Icons()
    MDDOSimagesbackground = bmp`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999777777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999977777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999977777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999977777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999997777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999997777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999997777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999777777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999977777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999997777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999997777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999777777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999977777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999997777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999777777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999977777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999997777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999777777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999997777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999777777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999997777777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999997777777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999997777777777
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999999999
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999999999
        8888888888888888888888888888555555555555555555555555555555555558888888888888888888888888888888888888888888888888888888888888888888889999999999999999999999999999
        8888888888888888888888888885fffffffffffffffffffffffffffffffffff5888888888888888888888888888888888888888888888888888888888888888888888899999999999999999999999999
        8888888888888888888888888885fffffffffffffffffffffffffffffffffff5888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999999
        888888888888888888888888885ffffff5555555fffffffff5555555ffffffff588888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999999
        888888888888888888888888885fffff555555555fffffff555555555fffffff588888888888888888888888888888888888888888888888888888888888888888888888888888999999999999999999
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888889999999999999
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffff55555555555fffff55555555555ffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885fffff555555555fffffff555555555fffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885ffffff5555555fffffffff5555555ffffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885fffffffffffffffffffffffffffffffffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888885fffffffffffffffffffffffffffffffffffff588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888885fffffffffffffffffffffffffffffffffff5888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888885555555555555555555555555555555555555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888899888889988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888898988889898888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888889888888898888888898898889889888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888898988888998888888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888898988888989888888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888898898888989888888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888988898889888988888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888988889889888898888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888988889898888898888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888889888888998888889888898889889888988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888889888888998888888988898898889889888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888889888888898888888888898988889898888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888899888889988888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        `
}
function DrawDesktopApps () {
    if (OnButton(MDDOSappslot1x, MDDOSappslot1y, 16, 16)) {
        screen().fillRect(MDDOSappslot1x, MDDOSappslot1y, 16, 16, 1)
        screen().drawTransparentBitmap(MDDOSappsslot1bp, MDDOSappslot1x, MDDOSappslot1y)
    } else {
        screen().drawTransparentBitmap(MDDOSappsslot1bp, MDDOSappslot1x, MDDOSappslot1y)
    }
    screen().print(MDDOSappsslot1, MDDOSappslot1x - 10, MDDOSappslot1y + 17, 1)
}
function LaunchApp (app: string) {
    LaunchAppLogic(app)
    MDDOSappopen = true
}
// MDD is a full Operating Sytem for micro:bit V2, using display shields.
// 
// Current MDD release: Dev 1.0.0
// 
// Git Repo: https://github.com/fozogt-jpg/MDD
// 
// Boot Flags are:
// --demo: Launch in a mode that does not use user spefic things and is generally better for looking at and testing the end user expirence
// 
// --desktop-test: Boot straight to the desktop
// 
// --skip-load: Skip the MDD loading screen.
// 
// --kiosk-app: Launch only what is nesscary to boot an app then boots straight into it, the app can be set in the MDDSYSSelectedKiosk_App var. Adding [Bars] to the end will add Bars the same size as the taskbar and appbar.
let MDDOSappssettingschannellog_lines_y = 0
let MDDOSappssettingsprint_channellog_lines = 0
let MDDOSPnPcurrent_device_name = ""
let MDDSYSserialline = ""
let MDDOSiconsredx: Bitmap = null
let MDDOSos_hash = ""
let MDDSYStempfull_hash = 0
let MDDOSchannellog: string[] = []
let MDDOSchannellog_lines = 0
let MDDOSiconsble: Bitmap = null
let MDDOSiconstart: Bitmap = null
let MDDOSiconscursor: Bitmap = null
let MDDOSiconssleep: Bitmap = null
let MDDOSiconsrestart: Bitmap = null
let MDDOSiconspower: Bitmap = null
let MDDSYSlogAPIcurrent_line = 0
let MDDSYSsys_ver = ""
let MDDOSiconssettings: Bitmap = null
let MDDOSappsslot1bp: Bitmap = null
let MDDOSappsslot1 = ""
let MDDSYStempkernel_hash = ""
let MDDSYSRenderstart_kioskarray: string[] = []
let MDDSYSKiosk_App = false
let MDDSYSkioskbars = false
let MDDSYSload_ = 0
let MDDSYSboot_icon: Bitmap = null
let MDDSYSfirm_type = ""
let MDDSYSslots5: string[] = []
let MDDSYSslots4: string[] = []
let MDDSYSslots3: string[] = []
let MDDSYSslots2: string[] = []
let MDDSYSslotscsv = ""
let MDDSYSsetupcomplete = ""
let MDDSYSslots1: string[] = []
let MDDOSmousey = 0
let MDDOSmousex = 0
let MDDOSOnButtonc4y = 0
let MDDOSOnButtonc4x = 0
let MDDOSOnButtonc3y = 0
let MDDOSOnButtonc3x = 0
let MDDOSOnButtonc2y = 0
let MDDOSOnButtonc2x = 0
let MDDOSOnButtonc1y = 0
let MDDOSOnButtonc1x = 0
let MDDSYSOverride_Render_Error = false
let MDDSYSSysErrorError = ""
let MDDOSbleconnected = false
let MDDSYSbleon = false
let MDDOSimagesbackground: Bitmap = null
let MDDSYSRenderallow = false
let MDDSYSPostDisplay_Shield = false
let MDDOSappssettingsopen = false
let MDDOSiconsappssettingsabout: Bitmap = null
let MDDOSappssettingscurrentpage = ""
let MDDSYSPowerMenuopen = false
let MDDOScurrentopenapp = ""
let MDDOSappopen = false
let MDDOSStartmenuopen = false
let MDDOSappslot1y = 0
let MDDOSappslot1x = 0
let MDDSYSSelectedKiosk_App = ""
MDDSYSSelectedKiosk_App = ""
Boot("--desktop-test")
loops.everyInterval(1000, function () {
    MDDOSos_hash = "" + convertToText(randint(0, 100)) + convertToText(randint(0, 100)) + convertToText(randint(0, 100)) + convertToText(randint(0, 100)) + convertToText(randint(0, 100))
})
basic.forever(function () {
    if (MDDSYSOverride_Render_Error) {
        Render("--error", MDDSYSSysErrorError)
    } else if (MDDSYSKiosk_App) {
        Render("--kiosk-app", "")
    } else if (MDDSYSRenderallow) {
        Render("", "")
    }
})
