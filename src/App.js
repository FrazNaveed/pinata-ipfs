import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
const pinataSDK = require("@pinata/sdk");
const client = create('https://ipfs.infura.io:5001/api/v0')

// I know keys are here
const pinata = pinataSDK(
  "1bbb9d9e051a0ff19ade",
  "4b6fcef506f1387910ad6c6a023dfd5d014461313673e6ab494cd91c2157fe2b"
);

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  const [metadata, setMetadata] = useState("")
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const img = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(img);

      const body = {
        image: img
    };
    const options = {
        pinataMetadata: {
            name: "Crease Token",
            keyvalues: {
                customKey: 'Crease Metadata',
                customKey2: Math.random()
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinJSONToIPFS(body, options).then((result) => {
      var metadataURI  = "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash;

    }).catch((err) => {
        console.log(err);
    });


    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
      <p>{fileUrl}</p>
    </div>
  );
}

export default App