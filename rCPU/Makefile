CC=gcc
CFLAGS=-pthread -std=gnu99
CFILES=rcpu.c dwebsvr.c
RESOURCES=index.h smoothie-min.h code-min.h jquery-3-6-0-min.h styles-min.h
TARGET=rcpu

$(TARGET): $(CFILES) $(RESOURCES)
	$(CC) $(CFILES) $(CFLAGS) -o $@

index.h: index.html
	xxd -i index.html index.h

smoothie-min.h: smoothie.min.js
	xxd -i smoothie.min.js smoothie-min.h

code-min.h: code.min.js
	xxd -i code.min.js code-min.h

jquery-3-5-1-min.h: jquery-3.6.0.min.js
	xxd -i jquery-3.6.0.min.js jquery-3-6-0-min.h
	
styles-min.h: styles.min.css
	xxd -i styles.min.css styles-min.h

vocore: $(CFILES) $(RESOURCES)
	export STAGING_DIR=$$PWD; \
    `find /home -name mipsel-openwrt-linux-gcc -print -quit -print 2>/dev/null` -o $(TARGET) \
    -Os -s $(CFILES) $(CFLAGS)

wr740n: $(CFILES) $(RESOURCES)
	export STAGING_DIR=$$PWD; \
    `find /home -name mips-openwrt-linux-uclibc-gcc -print -quit -print 2>/dev/null` -o $(TARGET) \
    -Os -s $(CFILES) $(CFLAGS)

.PHONY: clean

install: $(TARGET)
	cp -n $(TARGET) /usr/local/bin
	cp -n init_script /etc/init.d/rCPU
	chmod +x /etc/init.d/rCPU
	update-rc.d rCPU defaults
	/etc/init.d/rCPU start

uninstall:
	/etc/init.d/rCPU stop
	update-rc.d -f rCPU remove
	rm -f /usr/local/bin/$(TARGET)
	rm -f /etc/init.d/rCPU

clean:
	rm -f *.o $(TARGET) $(RESOURCES)
