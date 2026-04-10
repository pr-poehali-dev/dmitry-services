"""
Отправляет заявку с сайта на почту Дмитрия через Яндекс SMTP.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
    call_time = body.get("callTime", "").strip()
    paint = body.get("paint", [])
    paint_other = body.get("paintOther", "").strip()
    mow = body.get("mow", [])
    demo = body.get("demo", [])
    demo_other = body.get("demoOther", "").strip()
    other = body.get("other", [])
    volume = body.get("volume", "").strip()
    conditions = body.get("conditions", [])

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "name and phone required"})}

    def fmt_list(items, extra=""):
        lines = [f"  • {i}" for i in items]
        if extra:
            lines.append(f"  • Другое: {extra}")
        return "\n".join(lines) if lines else "  —"

    text = f"""НОВАЯ ЗАЯВКА С САЙТА
{'=' * 40}

👤 Клиент: {name}
📞 Телефон: {phone}
🕐 Удобное время для звонка: {call_time or 'не указано'}

{'=' * 40}
ЧТО НУЖНО СДЕЛАТЬ:

🎨 Покраска:
{fmt_list(paint, paint_other)}

🌿 Покос и уборка:
{fmt_list(mow)}

🔨 Демонтаж:
{fmt_list(demo, demo_other)}

🔧 Прочее:
{fmt_list(other)}

{'=' * 40}
📦 Объём работ: {volume or 'не указан'}

✅ Условия на объекте:
{fmt_list(conditions)}
"""

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = os.environ.get("SMTP_USER", "noreply@poehali.dev")
    recipient = os.environ.get("ORDER_EMAIL", "")

    msg = MIMEMultipart()
    msg["Subject"] = f"Заявка с сайта — {name} ({phone})"
    msg["From"] = sender
    msg["To"] = recipient
    msg.attach(MIMEText(text, "plain", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
            server.login(sender, smtp_password)
            server.sendmail(sender, [recipient], msg.as_string())
    except Exception as e:
        return {"statusCode": 500, "headers": cors_headers, "body": json.dumps({"error": str(e)})}

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
