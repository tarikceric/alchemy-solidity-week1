## ECDSA Node - Week 1 Alchemy + Solidity

The goal of this project was to enhance an application (consisting of a react front-end that communicates with a single server) by incorporating public key cryptography. A digital signature is applied, so that only a user holding the appropriate private key is able to create a signature which can move funds between accounts. This signature is then verified by the server in order to confirm the transfer.

In order to accomplish this, the first step is to utilize the 'generate.js' script which creates 3 separate combinations for a private key, public key, and address. In the front end application, a user can type in the private key, and it should return the balance of the address which is derived from that private key. The address of the recipient can then be passed in to send funds.

The 'ethereum-cryptography' library is used extensively in order to generate keys/addresses, encode messages, and recover public keys.



----------------------Original ReadMe Below-------------------
## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
