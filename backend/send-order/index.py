"""
Отправляет заявку с сайта в Telegram Дмитрию.
"""
import json
import os
import urllib.request


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

    text = (
        f"📋 *НОВАЯ ЗАЯВКА С САЙТА*\n"
        f"{'─' * 30}\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"🔧 Услуга: {service or '—'}\n"
        f"💬 Комментарий: {comment or '—'}\n"
        f"{'─' * 30}\n"
        f"Ответить: {phone}"
    )

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    if not bot_token or not chat_id:
        return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": "telegram not configured"})}

    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }).encode("utf-8")

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{bot_token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            if not result.get("ok"):
                return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": "telegram error"})}
    except Exception as e:
        return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": str(e)})}

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
