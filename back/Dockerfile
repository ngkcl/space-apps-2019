FROM archlinux/base

RUN yes | pacman -Sy
RUN mkdir /app
RUN yes | pacman -S python-flask python-flask-jwt python-flasgger python-peewee
RUN yes | pacman -S python-psycopg2 python-numpy python-scipy python-matplotlib jupyter

COPY ./ /app/
WORKDIR /app/

EXPOSE 80
ENTRYPOINT bash ./run.sh
