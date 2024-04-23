from websocket_server import WebsocketServer
import logging
import os
import json
import threading
import time

class Websocket_Server:
    def __init__(self,host,port):
        self.server=WebsocketServer(port=port,host=host,loglevel=logging.DEBUG)

    def new_client(self,client,server):
        print("new client connected and was given id {}".format(client['id']))
        # self.server.send_message_to_all("hey all, a new client has joined us")

    def client_left(self,client,server):
        print("client({}) disconnected".format(client['id']))

    def message_received(self,client,server,message):
        data=json.loads(message)
        if not os.path.exists(data["name"]):
            os.mkdir(data["name"])
            os.system(":> {} {}".format(*[os.path.join(data["name"],i) for i in ["compile_error.txt","log.txt","input.txt"]]))
        with open(os.path.join(data["name"],"main.c"),mode="w") as f:
            f.write(data["src"])
        recv_data={
            "compile_error":"",
            "output":"",
            "correct":False
        }
        if os.system(f'gcc \"{os.path.join(data["name"],"main.c")}\" -o \"{os.path.join(data["name"],"a.out")}\" 2> \"{os.path.join(data["name"],"compile_error.txt")}\"'):
            with open(os.path.join(data["name"],"compile_error.txt"),mode="r") as f:
                recv_data["compile_error"]=f.read()
        else:
            if data["label"]==data["title"]=="":
                if os.system(f'echo \"{data["input"]}\" | timeout 300 \"{os.path.join(data["name"],"a.out")}\" &> \"{os.path.join(data["name"],"log.txt")}\"'):
                    recv_data["output"]="timeout"
                else:
                    with open(os.path.join(data["name"],"log.txt"),mode="r") as f:
                        recv_data["output"]=f.read()
            else:
                flag=True
                for d in content[data["label"]][data["title"]]:
                    with open(f'{os.path.join(data["name"],"input.txt")}',mode="w") as f:
                        f.write(d["input"])
                    if os.system(f'cat {os.path.join(data["name"],"input.txt")} | timeout 10 \"{os.path.join(data["name"],"a.out")}\" &> \"{os.path.join(data["name"],"log.txt")}\"'):
                        recv_data["output"]="timeout"
                        flag=False
                        break
                    else:
                        with open(os.path.join(data["name"],"log.txt"),mode="r") as f:
                            recv_data["output"]=f.read()
                        if recv_data["output"]!=d["output"]:
                            flag=False
                            break
                recv_data["correct"]=flag
        self.server.send_message(client,json.dumps(recv_data))

    def run(self):
        self.server.set_fn_new_client(self.new_client)
        self.server.set_fn_client_left(self.client_left)
        self.server.set_fn_message_received(self.message_received) 
        self.server.run_forever()

def watching():
    global content
    while True:
        c=json.load(open("content.json",mode="r"))
        if c!=content:
            content=c
            print("updated!")
        time.sleep(1)

content=json.load(open("content.json"))
threading.Thread(target=watching).start()
IP_ADDR="shininomacbook-air.local"
PORT=9001
ws_server=Websocket_Server(IP_ADDR,PORT)
ws_server.run()
