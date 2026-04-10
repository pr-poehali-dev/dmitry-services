"""
Отправляет заявку с сайта на email владельца через Gmail SMTP.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText


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

    text = f"Новая заявка с сайта\n\nИмя: {name}\nТелефон: {phone}\nУслуга: {service or '—'}\nКомментарий: {comment or '—'}"

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "d17223012@gmail.com"
    to_email = "d17223012@gmail.com"

    msg = MIMEText(text, "plain", "utf-8")
    msg["Subject"] = f"Заявка с сайта: {name}"
    msg["From"] = from_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(from_email, smtp_password)
        smtp.send_message(msg)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
