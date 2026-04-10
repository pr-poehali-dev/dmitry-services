"""
Отправляет заявку с сайта через СМС на номер Дмитрия (sms.ru).
"""
import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "bad json"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    service = body.get("volume", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "name and phone required"})}

    sms_text = f"Заявка: {name}, тел {phone}"
    if service:
        sms_text += f", {service}"
    if comment:
        sms_text += f". {comment}"

    api_key = os.environ.get("SMSRU_API_KEY", "")
    to_phone = "89935039859"

    params = urllib.parse.urlencode({
        "api_id": api_key,
        "to": to_phone,
        "msg": sms_text,
        "json": 1,
    })

    url = f"https://sms.ru/sms/send?{params}"

    try:
        req = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            status = result.get("status")
            if status != "OK":
                return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": f"sms.ru: {status}", "detail": result})}
    except Exception as e:
        return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": str(e)})}

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
