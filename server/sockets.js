module.exports = {
    connect: function(io, PORT){
        //default rooms/channels
        var rooms = ["defaultChannel", "defaultChannel2", "superChannel1", "super-channel", "groupadmin-channel1", "groupadmin-channel2"];
        var socketRoom = [];
        var socketRoomnum = [];

        const chat = io.of('/home');

        chat.on('connection', (socket) => {
            console.log('connected on port' + PORT + ':' + socket.id);
            //emits message
            socket.on('message', (message)=>{
                for (i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        chat.to(socketRoom[i][1]).emit('message', message);
                    }
                }
            });

            //pushes newroom to rooms array
            socket.on('newroom', (newroom)=>{
                if (rooms.indexOf(newroom) == -1){
                    rooms.push(newroom);
                    chat.emit('roomlist', JSON.stringify(rooms));
                }
            });

            //emits roomlist
            socket.on('roomlist', (m)=>{
                chat.emit('roomlist', JSON.stringify(rooms));
            });

            //displays number of users
            socket.on('numusers', (room)=>{
                var usercount = 0;

                for (i=0; i<socketRoomnum.length; i++){
                    if(socketRoomnum[i][0]== room){
                        usercount = socketRoomnum[i][1];
                    }
                }

                chat.in(room).emit('numusers', usercount);
            });

            //join room
            socket.on('joinRoom', async (room)=>{
                if(rooms.includes(room)){
                    console.log(rooms);
                    console.log(room);
                    await socket.join(room)
                        var inroomSocketarray = false;

                        for (i=0; i<socketRoom.length; i++){
                            if (socketRoom[i][0]==socket.id){
                                socketRoom[i][1] = room;
                                inroom = true;
                            }
                        }
                        if (inroomSocketarray == false){
                            socketRoom.push([socket.id, room]);
                            var hasroomnum = false;

                            for (j=0; j<socketRoomnum.length; j++){
                                if(socketRoomnum[j][0]==room){
                                    socketRoomnum[j][1]= socketRoomnum[j][1] +1;
                                    hasroomnum = true;
                                }
                            }

                            if (hasroomnum == false){
                                socketRoomnum.push([room, 1]);
                            }
                        }

                        chat.in(room).emit("notice", "A New User has joined");
                    
                    return chat.in(room).emit("joined", room);
                }
            });

            //leave room
            socket.on("leaveRoom", (room)=>{
                for (let i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                        socket.leave(room);
                        chat.to(room).emit("notice", "A user has left");
                    }
                }

                for (let j=0; j<socketRoomnum.length; j++){
                    if(socketRoomnum[j][0]==room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                        if(socketRoomnum[j][1] == 0){
                            socketRoomnum.splice(j,1);
                        }
                    }
                }
            });

            //disconnect
            socket.on('disconnect', ()=>{
                chat.emit("disconnected");
                for (let i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                    }
                }
                for (let j=0; j<socketRoomnum.length; j++){
                    if(socketRoomnum[j][0]== socket.room){
                        socketRoomnum[j][1] = socketRoomnum[j][1] -1;
                    }
                }
                console.log("Client Disconnected");
            });
        });
    }
}