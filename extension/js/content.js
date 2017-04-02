const PGP_MESSAGE_START = "-----BEGIN PGP MESSAGE-----";

let IliasPublicKey = `
               
               -----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2

mQENBFjgzNQBCACgOuj2GzQBMCwLCEmuwE9GMHtT8T4M3ab2IVYcuxWGZjOlad41
k+b5eXG/IJQndwMEMobSstF2eQFGE2sGvKpJJT2kmAz1ptxrkVPgvkWrCjJCLFYj
oWKz9ijcEeFYMpXQPhF2yHEGPEUd0uJ+6Ic7+jwA5YM2RG31EnVBDXDdgw+//WjC
SXfYnA12+GquIltDohA6/MCavvKkhjSH396716wNaq1Qv1DeXIK4/Vvpf0xq/ZHs
iXRV+/UsRbJC9eEU+KOzP93UPYxbUVFWe8o2L5Z0K/VTq6O0RRoCgJUbzTpAF96h
ZosTzmCHxkieD6nYFcgZJxPwtc8+Eo/SKohVABEBAAG0JU1MSFByaW1lIFRlc3Qg
MiA8bXJub29uZTM4QGdtYWlsLmNvbT6JATkEEwEIACMFAljgzNQCGwMHCwkIBwMC
AQYVCAIJCgsEFgIDAQIeAQIXgAAKCRBmyy+Mgb1hzr2mB/4j4rPDRzXRXxDCLfbH
wqXP4aaQR6HRo2hWeZFhhoJsbPDJBBrFviM28XMHyT+wF6jny3zuNJWq2V5aMCI/
/zbJWWqGagzksSMK7TbLPYDAGfGV+TBdENZBLsv+HWqc0T34HdLS1dgjnTGdP9Hj
6qieOupL1ZIMlpIH3vKWATUKFu4IqkFQPG6+tSdRk1XyKlh/RABQ3LezYwDs58fV
Jj8Ywa3VE/qsrGTKQe+uTL3ox17E8t4F+R7xxlw4mL581G//Q8wrPG190uqi6Kqg
F92vWc2GdVjcN6MbY5E+XzX5S7Moi0MDgvht7Q8kApd5tswNXOTeKBUDyvrYlFeG
aXHOuQENBFjgzNQBCACtRgRq9auaTglfiBpf3yVbhurG3GUBj2wpdtBNJMZT9zqy
9u1C7pXp+AECovPVfoNBtHwAaE8ULmo3YzNGZ4/pHRwj1Wo6TNf7LaY5PXXP6y/t
BerojoEmNlhzWRiCcT3GUTY3JRlDvDT0pzLzK9Gai2ZyojJDZG/16LyOaSIAssDA
DcEzu1bILk4K+yuaIXV3hz5pQrkcOdCYlm7JIXRB1b67vNw+oEjPN82NPmrZkKtY
1t7Dq20t0TBmnPVAWVTx0icnaVnTx73U7vWBj/cUPgAwTeMjAKZObsWLg7lq1934
8WE7wg7y/Pl/1obHncLt20ozdletfPdlFBAo3nvTABEBAAGJAR8EGAEIAAkFAljg
zNQCGwwACgkQZssvjIG9Yc4z3wf8DcD6LJP6BpgtR48YnsHehUF49x79iFVjhQ1c
Jv6n9PjkyTxqP9+redUq7XWiLMzPrs9nXJj3x3kRlpeqNK5U6Xzg+gedNZm+rMXh
V4WjKvBJDOCAQVl35wyqy/VjqOFfUBxm7xl34mCkbYotY8ITu0Zg7yB4OFll+8uD
kipkTRlbJd/B6AvMxVI9aSNmAGORko1Y9VG8egY/+Jd42qWjFqIBe2fv8hHVMu4h
uScPmLNHURRRDabiIbBDch/StoMFs8mH6Hvp/30tI6kkZm/NXU6ZKWObaDxDeGqA
x3pDXWs7AMCOenFE+wUQ3Hm43PjF2SmhyOcKDTZndvJ9FwJ7bQ==
=abrN
-----END PGP PUBLIC KEY BLOCK-----
            
            `;

let IliasPrivateKey = `
            -----BEGIN PGP PRIVATE KEY BLOCK-----
Version: GnuPG v2

lQOYBFjgzNQBCACgOuj2GzQBMCwLCEmuwE9GMHtT8T4M3ab2IVYcuxWGZjOlad41
k+b5eXG/IJQndwMEMobSstF2eQFGE2sGvKpJJT2kmAz1ptxrkVPgvkWrCjJCLFYj
oWKz9ijcEeFYMpXQPhF2yHEGPEUd0uJ+6Ic7+jwA5YM2RG31EnVBDXDdgw+//WjC
SXfYnA12+GquIltDohA6/MCavvKkhjSH396716wNaq1Qv1DeXIK4/Vvpf0xq/ZHs
iXRV+/UsRbJC9eEU+KOzP93UPYxbUVFWe8o2L5Z0K/VTq6O0RRoCgJUbzTpAF96h
ZosTzmCHxkieD6nYFcgZJxPwtc8+Eo/SKohVABEBAAEAB/kBKY7n6CMcsMLaXU1G
3gDFN36m3tIOfwDMz3RD4Zc393T/nxtm+UNx7a+wTVYdzNciAul896Hy3CZbodzt
z9UOvPKBR5QX0nB4vEq8OjfK/u2F6DNDb2fbT9lp3UcB9YimLykVGuz3o1zJ/li5
HHU3WhWbg7lhCFE24lMk7Wod7+hEcWjGwjUAqVIe9oMHflW3M5bKImgB2Qkn49UD
xkqf+0dKaqVhrD06a5Xu6UiiKiEXCLsX1M1BTos6pzV4wUKibMGabR32vjlcKryT
slcI/IsuOAE67zKsuPUcvik1ODWVM4KzOLfe6xeZGnSqmUUg+1hzJOekx0J8uAA0
wrkxBADFdSEKro3WrjDBAjRofPn0O4knYkL7OdtyTj4fnAf1LKzrs6pwSQF2kNGT
KEMGKbHQjlZyvyc/CMcbcVyYAAAbsVgDee1qfuhABiNUv+uFlDLm2PTG6b7607zP
if4hJHWeNDxbJ6IbbydWFDXOadNdGI9cGX5TGDpxQoUTvqWBBQQAz7w/0oWKIPHi
drVPqEOKBeg1RibVbRx6rR2GGj+iv0bLS3D7+7P9Fk1IsUiLjaTTw3sbGDvBM9og
PAfEMdbe8gcdCxpJOJSMNkTiMxmMJk1ncD0yXMzc8LdyhtoBg8fpSKGA1WxZdEgC
hyNB++b/pMmuIFk2zPPREOcNXjrGyxED/iuK1eT+nmoVXxNazk4Vlq3qegvbp1uX
1m8vi2Z/HECma7apB/UGUtPNg3BJt3syUyAyCidUIQFVVjYHkmtkAxvJYJQzemqY
wUTbhRG41XW1smsjVi+7rivjqudQlm7ZibtARZ9gY9VLxumsDfBjuPR1SjdTJBQm
dFoEpz2dsOIMMf20JU1MSFByaW1lIFRlc3QgMiA8bXJub29uZTM4QGdtYWlsLmNv
bT6JATkEEwEIACMFAljgzNQCGwMHCwkIBwMCAQYVCAIJCgsEFgIDAQIeAQIXgAAK
CRBmyy+Mgb1hzr2mB/4j4rPDRzXRXxDCLfbHwqXP4aaQR6HRo2hWeZFhhoJsbPDJ
BBrFviM28XMHyT+wF6jny3zuNJWq2V5aMCI//zbJWWqGagzksSMK7TbLPYDAGfGV
+TBdENZBLsv+HWqc0T34HdLS1dgjnTGdP9Hj6qieOupL1ZIMlpIH3vKWATUKFu4I
qkFQPG6+tSdRk1XyKlh/RABQ3LezYwDs58fVJj8Ywa3VE/qsrGTKQe+uTL3ox17E
8t4F+R7xxlw4mL581G//Q8wrPG190uqi6KqgF92vWc2GdVjcN6MbY5E+XzX5S7Mo
i0MDgvht7Q8kApd5tswNXOTeKBUDyvrYlFeGaXHOnQOYBFjgzNQBCACtRgRq9aua
TglfiBpf3yVbhurG3GUBj2wpdtBNJMZT9zqy9u1C7pXp+AECovPVfoNBtHwAaE8U
Lmo3YzNGZ4/pHRwj1Wo6TNf7LaY5PXXP6y/tBerojoEmNlhzWRiCcT3GUTY3JRlD
vDT0pzLzK9Gai2ZyojJDZG/16LyOaSIAssDADcEzu1bILk4K+yuaIXV3hz5pQrkc
OdCYlm7JIXRB1b67vNw+oEjPN82NPmrZkKtY1t7Dq20t0TBmnPVAWVTx0icnaVnT
x73U7vWBj/cUPgAwTeMjAKZObsWLg7lq19348WE7wg7y/Pl/1obHncLt20ozdlet
fPdlFBAo3nvTABEBAAEAB/9SSO5fJvSLriRoYBd6UNuKSBtlPZOf9o68cCaChATF
KiKPi5Dn2KqLthEwwda+m7pUcRP0E5T+Nf6N+AeJFzQx1XegEsDEF+r3ZtnJ1ASH
LR6Q1l8Uelwdm/BMMtLfW0ylSbrP3EfPsWiKiH47GaOL20hXBuyMsX0z0Ab/MDEM
GA9EMPjBkmlRw5fsxGVW9deAf/GkEev3t3Y0ERQRlvIrh6YDd6ikcVSeYNZOqZ+6
Qq17XVC9BYmvRiqwjQVeNRGKQgq5gcTCiLccGMPKc1pJZoCJdmQW5ejgGo/XSjlW
zwNyDecMz1e6Zu/hi5s5KT5bT32SQzvD5JqSJGzaCQ8JBADR3VQ21LGxZsgWyEG4
L/9lnpBtM6b40KLK7caL321Z0PvRUkxHRiZyj0ybJM3mownTS9OHrmek9iQS3d+r
MXGk2mMbGH4apXu3kP0Mw4dtWRsbXPvU0leoJwbvuCeZjVgCBFniQc6j5kGPqaa/
MYnwqI5+Y/BhD/aO7y+OgE/KewQA011uhQyHojqHtXM6WDBs1jAJR0EaZUt1ep0o
z9HrULJixHfbllsUfk752nO5vcW1uCwdlT2ogaoO1/K+nUD3YEa3vZo8PNJdPDsS
E30g3gU1juOkAKy6lLXaLeGnxRAhBUBVgGCIXtMU9ngehjlG5MtR/uOoLnMLkmrF
jLSnYIkD/RbFujJ/8mHfgof63p/Xee/H5z5SDw3PIxhuia+LcTy9040ZOJm1HmY4
Wzbigf4Nx4OD1cB9L4Qea7lic4AqxRwD26aGJXq732bgPxUFepXRE/3UjRByFCFj
wgtvTppuTDvzmGTcrGUvZ48K8DIrGD2e8XEzvK8zzo6C7gkrPo1QPUCJAR8EGAEI
AAkFAljgzNQCGwwACgkQZssvjIG9Yc4z3wf8DcD6LJP6BpgtR48YnsHehUF49x79
iFVjhQ1cJv6n9PjkyTxqP9+redUq7XWiLMzPrs9nXJj3x3kRlpeqNK5U6Xzg+ged
NZm+rMXhV4WjKvBJDOCAQVl35wyqy/VjqOFfUBxm7xl34mCkbYotY8ITu0Zg7yB4
OFll+8uDkipkTRlbJd/B6AvMxVI9aSNmAGORko1Y9VG8egY/+Jd42qWjFqIBe2fv
8hHVMu4huScPmLNHURRRDabiIbBDch/StoMFs8mH6Hvp/30tI6kkZm/NXU6ZKWOb
aDxDeGqAx3pDXWs7AMCOenFE+wUQ3Hm43PjF2SmhyOcKDTZndvJ9FwJ7bQ==
=jLUo
-----END PGP PRIVATE KEY BLOCK-----
`;

let ArghaPublicKey = `
            -----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2

mQENBFjfuR0BCACj+L1zNzZGYHnNX/XpGvWEnY0lYMohBf6dq4zuXC5mTKqt8YdC
hKxBC1SGQ6qJCVzGD7Rm0edksqFj2aFYK5Al0pi4FLqiPWfyrpvRLvXIDm3PS/nr
wetS/Ik5ABexiXEYtHEDZ20tGigzmP5pDgJAOVbGG/gdOU3UeXFq977rc3Pmy3PI
LR/4WZi2fv29b8DNldriynHdKwXenMXzLe6p9dk0/KY+cnP3Btf1XVk8VABZAUJg
qgWEfkmqfNJ8YBvhe99i4Z+4Shr6CA2c1fDes2b0IixFGjpRbjFuiVBgL2aGbAwc
BKW7pE8LiTSdyR1HlHozHSJzz1q+nVixVBbjABEBAAG0HU1MSFByaW1lIFRlc3Qg
PHRlc3RAdGVzdC5jb20+iQE5BBMBCAAjBQJY37kdAhsDBwsJCAcDAgEGFQgCCQoL
BBYCAwECHgECF4AACgkQU7Iup6pAghnb1gf+JUqpO2HxAnq8+EfVIzfI80Cbf5Jq
reeLpf1B7PW6MzBSTU7dua6PHjni4TL+AK+NScd73Q+773Dzvl1VTOYS6LgezAOB
fjVfICMvcbtv5fwRV/lspjo7ElV4l1g+W0FrWPpICxt+BCYNKYCln44TsaHfXh8v
3rS0b7QEQVPLUM5rkASdWm2LZJzrBfaP4zRATxEWUJTXTJp4Dj/DrOkFeACJvR9T
DeRM6npIcsujPSntlcja0wvgxKRdS6eLDLncmcNsSgVX80oexRywODKNVvDAiwN0
QmHhKL21XOvGYuEWo+dSrBy20AJgk9wO43jhQ8hhW2LK8H7G/boIzNeDTrkBDQRY
37kdAQgAowQoNA9qtjNmqDB0R0vRGnpmJdfzNyrXNAUCO5VB40UfA40zMTzYJxAM
qCwP2HCPPDitiOXbJlPESm7KXc4xsKvpUeDUUY+yUqi4He5M2yrS61DwRbFWZ0BU
weflSJOAnRqe79hPH75YlW5pQMIBhUPdx2m/21eN+CtJjai8oMfbJIfJzgS5TuEV
T9CxrqnniLDPxuVYE82S7vo8Bv7FgWc+AEmZfNgJ/PVJu+UjaHgY8de6vttWzR73
5hsfhuO33ZzKrddRFbpb2RD+noD/5b09uiEqt5GBPPcjAQfsFvf7cDPqqUw4SWA4
DFx+6N49tY4ohgUjGBRptFgij0yHRQARAQABiQEfBBgBCAAJBQJY37kdAhsMAAoJ
EFOyLqeqQIIZFWwH/RPERvxVZNU4gXNZcquP3Rj08J6MwPRJbQ4PclE9hCWGTXCB
GAKOVYZA8cYV1xeYiY9uy68wypUm95tdPzjqTYLt7A8zpJcpOPVLBwPkJGpKvY2B
GKTYuDMwu295yL8p721fvHhFiv9+ShD8j0snIP8ZX6nR3C+mwwzm9pN/oiWi82b/
NNosMlqznXDSezs8UVkGLRggGqDO/2/9b7xpgGZdiQZYuee+LV8aJix/jNdyrX+4
neAug6gtX4HxHYdgZGH/pf5Vmjuq9lWtGP5vQgIslT0zRnzC1o12CeICMbX8nuli
wZRuq/shQRYJe0xlN3EH3b+AhWPFmd1+dXz1Ags=
=hUIj
-----END PGP PUBLIC KEY BLOCK-----
            `;

let ArghaPrivateKey = `
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: GnuPG v2

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
=gNaW
-----END PGP PRIVATE KEY BLOCK-----

            `;

let x = 0;



document.addEventListener("click", function(){

    // Listener for sending messages
    document.getElementsByClassName("input")[1].addEventListener("keydown", function(event) {
        var message = document.getElementsByClassName("input")[1].innerText;

        // Get the recipient of the message.
        let recipient = document.getElementsByClassName("active")[0].children[1].children[0].children[0].children[0].innerText;
        console.log(event.keyCode);


        if (event.keyCode == 17) {




            if (recipient.includes("Ilias")) {
                console.log(recipient + " is receiving: " + message);

                // Use ilias's public key

                let options = {
                    data: message,                             // input as String (or Uint8Array)
                    publicKeys: openpgp.key.readArmored(IliasPublicKey).keys,  // for encryption
                };

                openpgp.encrypt(options).then(function(ciphertext) {
                    let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
                    document.getElementsByClassName("input")[1].innerText = encrypted;
                });

            } else if (recipient.includes("Argha")) {
                console.log(recipient + " is receiving: " + message);

                let options = {
                    data: message,                             // input as String (or Uint8Array)
                    publicKeys: openpgp.key.readArmored(IliasPublicKey).keys,  // for encryption
                };

                // Use Argha's public key
                openpgp.encrypt(options).then(function(ciphertext) {
                    let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
                    document.getElementsByClassName("input")[1].innerText = encrypted;
                });
            }
        }
    });

    // Run rest of the code in here

    var messageHolderElements = document.getElementsByClassName("message-text");
    var messages = [];
    var names = [];

    for (var i = 0; i < messageHolderElements.length; i++) {
        var line = document.getElementsByClassName("message-text")[i].children[0].innerText;
        var name = line.split("]")[1];
        var res = name.split(":")[0];
        names.push(res);
        messages.push(document.getElementsByClassName("message-text")[i].children[1].innerText);
    }

    /**
     * TODO: Send encrypted messages to background.js to be decryted. Then replace the existing message by the decrypted version.
     */
    for (var k = 0; k < messages.length; k++ ) {
        /*console.log("Sender: ", names[k]);
         */

        if (messages[k].includes(PGP_MESSAGE_START)) {
            // Need to decrypt this;
            //console.log("Encrypted: ", "(", names[k], ") ", messages[k]);



            if (names[k].includes("Argha Sarkar")) {
                console.log("Argha is sending")
            } else if (names[k].includes("Ilias")) {
                console.log("Ilias is sending");
            } else if (names[k].includes("Xavier")) {
                console.log("Xavier is sending");
            }

            // Decrypt here
            var privKeyObj = openpgp.key.readArmored(ArghaPrivateKey).keys[0];
            privKeyObj.decrypt("");

            let options = {
                message: openpgp.message.readArmored(messages[k]),     // parse armored message
                privateKey: privKeyObj // for decryption
            };

            decryptAndInsertMessageArgha(options, k);



        } else {
            //console.log("Unenc: ", "(", names[k], ") ", messages[k]);
        }


    }

});





function decryptAndInsertMessageArgha(options, valueOfK) {
    "use strict";
    openpgp.decrypt(options).then(function(plaintext) {
        document.getElementsByClassName("message-text")[valueOfK].children[1].innerText = plaintext.data;

        return plaintext.data; // 'Hello, World!'
    });
}

