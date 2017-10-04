#!/bin/bash

ps aux | grep puma | awk '{print $2'} | xargs kill
