---
title: Synchronization server
description: Instructions for installing the synchronization server.
footer: false
---

# Synchronization server

Instructions for installing the synchronization server.

## Installation

### Docker

Build image container:

```bash
docker build github.com/UsagiApp/syncserver.git -t usagiapp/syncserver
```

Run container:

```bash
docker run -d -p 8081:8080 \
-e DATABASE_HOST=your_db_host \
-e DATABASE_USER=your_db_user \
-e DATABASE_PASSWORD=your_db_password \
-e DATABASE_NAME=your_db_name \
-e DATABASE_PORT=your_db_port \
-e JWT_SECRET=your_secret \
--restart always \
--name usagi-sync usagiapp/syncserver
```

### Systemd

Requirements:

- JDK 11+
- Gradle 7.0+

Commands:

```bash
git clone https://github.com/UsagiApp/syncserver.git
cd syncserver && ./gradlew shadowJar
```

Then edit the service file from the repository, change `replaceme` fields with your values, and specify the generated `.jar` file location (it can be found in the `build/libs` directory after building).

```bash
cp <service-file>.service /etc/systemd/system/
systemctl enable <service-name>
systemctl daemon-reload
systemctl start <service-name>
```

For any questions, please, contact us in [Telegram group](https://t.me/UsagiApp) or write an issue, thanks.
