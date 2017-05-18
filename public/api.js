while(1){
    // Accept a new connection and return back the socket desciptor
    new_conn_fd = accept(listner, (struct sockaddr *) & client_addr, &addr_size);
    if(new_conn_fd < 0)
    {
        fprintf(stderr,"accept: %s\n",gai_strerror(new_conn_fd));
        continue;
    }
    inet_ntop(client_addr.ss_family, get_in_addr((struct sockaddr *) &client_addr),s ,sizeof s);
    printf("I am now connected to %s \n",s);

    int received = -1;
    int total = 0;
    int i = 0;
    int is_first_call = 1;
    char *data = (char*)calloc(10000000, 4);
    char tmp[BUFFSIZE];
    /*
     * The code below is for receiving data from tcp client.
     * recv() will be called several times when the command is postVideo,
     * and the tcp client will close connection after sending all the data.
     * For other commands, recv() will be called only once, and will break after first call.
     */
    while((received = recv(new_conn_fd, buf, BUFFSIZE, 0)) > 0){

        if (received == -1)  printf("Failed to receive initial bytes from client");
        if (received == 0)   break;

        int j = 0;
        while(j < received){
            data[i+j] = buf[j];
            j++;
        }
        i += received;
        total += received;
        // printf("data : %s\n", data);
        if (received != 1024 && is_first_call == 1){
            json_object * jobj = json_tokener_parse(data);
            if (strcmp(json_object_get_string((json_object_object_get(jobj,"command"))),"postVideo") != 0) break;
        }
        is_first_call = 0;
    }

    //printf("received and saved total of %zu bytes\n", total );
    printf("Received String from Client : %s\n",data);
    //printf("Length of data : %d\n", strlen(data));

    // Parse json string format data received from client end

    json_object * jobj = json_tokener_parse(data);
    json_object * command = json_object_object_get(jobj,"command");
    printf("command is %s\n",json_object_get_string(command));