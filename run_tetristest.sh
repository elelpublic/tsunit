#!/bin/bash

tsc *.ts
tsc samples/tetris/*.ts
node samples/tetris/tetristest.js
