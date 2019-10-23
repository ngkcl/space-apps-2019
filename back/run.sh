#/bin/bash

# jupyter notebook --config=./config.py &


if [[ -z $PORT ]]; then
  export PORT=80
fi

flask run --host 0.0.0.0 --port $PORT --reload