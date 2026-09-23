let microfimacaddress = ""
let microfiipaddress = ""
let microfibleuartstring = ""
let microfiradiohelperarray: string[] = []
let microfiradiochannel = 0
let microfiradiomsg = ""
// Micro-FI is wifi for micro:bit
// 
// Using BLE (instead of a wifi chip)
// 
// Router site and source code
// https://jxoj.github.io/Micro-FI
// https://github.com/jxoj/Micro-FI
// 
// IP addresses look like this 678.123.5.135
// 
// Mac addesses look like this
// 
// sim-1599129455
// 
// Use GetRawTxt to get txt from a web address such as https://example.com/example.txt
// 
// Use PostRawTxt to send data to other micro:bits
// 
// Use Radio to simulate micro:bit Radio
// for examples see the Test function
function InitMicroFI() {
    bluetooth.setTransmitPower(7)
    bluetooth.startUartService()
    bluetooth.uartWriteString("MAC#")
    microfimacaddress = "" + control.deviceName() + control.deviceSerialNumber()
    basic.pause(100)
    bluetooth.uartWriteString(microfimacaddress)
    basic.pause(100)
    bluetooth.uartWriteString("IP#")
    basic.pause(100)
    microfiipaddress = microfibleuartstring
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    if (microfibleuartstring == "radio") {
        basic.pause(100)
        microfiradiohelperarray = microfibleuartstring.split(" ")
        microfiradiochannel = parseFloat(microfiradiohelperarray[0])
        microfiradiomsg = microfiradiohelperarray[1]
        control.raiseEvent(
            2026,
            microfiradiochannel
        )
    } else {
        microfibleuartstring = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    }
})
// Example Test Code
control.onEvent(2026, 1, function () {
    if (microfiradiomsg == "Hello") {
        Radio(1, "Hi!")
    }
})
function Radio(channel: number, data: string) {
    microfiauthorize()
    bluetooth.uartWriteString("radio#")
    bluetooth.uartWriteString("" + channel + " " + data + "#")
}
function GetRawTxt(web_address: string) {
    microfiauthorize()
    bluetooth.uartWriteString("request#")
    bluetooth.uartWriteString("get#")
    bluetooth.uartWriteString(web_address)
    basic.pause(100)
    return microfibleuartstring
}

function PostRawTxt(web_address: string, data: string) {
    microfiauthorize()
    bluetooth.uartWriteString("request#")
    bluetooth.uartWriteString("post#")
    bluetooth.uartWriteString(web_address)
}
function microfiauthorize() {
    bluetooth.uartWriteString("" + microfimacaddress + "#")
    pauseUntil(() => microfibleuartstring == "MACokay")
    bluetooth.uartWriteString("" + microfiipaddress + "#")
    pauseUntil(() => microfibleuartstring == "IPokay")
    pauseUntil(() => microfibleuartstring == "AUTHokay")
}
