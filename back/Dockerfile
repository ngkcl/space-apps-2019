FROM archlinux/base

RUN yes | pacman -Sy
RUN yes | pacman -S poetry && mkdir /app
RUN yes | pacman -S python-setuptools
RUN yes | pacman -S python-pip

COPY pyproject.toml /app

WORKDIR "/app"

RUN poetry config settings.virtualenvs.create false && poetry install

COPY ./* /app


EXPOSE 9999
EXPOSE 5000
EXPOSE 8888

ENTRYPOINT bash ./run.sh
