const PGP_MESSAGE_START = "-----BEGIN PGP MESSAGE-----";
//
// $(".infinite-list-item infinite-list-item-transition").click(function() {
//     "use strict";
//    console.log("New chat clicked");
// });
//
// $(".chat").click(function() {
//     "use strict";
//     console.log("New chat clicked - chat");
// });
// $("body").on("click", ".infinite-list-item infinite-list-item-transition", function() {
//     "use strict";
//     console.log("on click");
// })
let x = 0;
document.addEventListener("click", function(){

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
            console.log("Encrypted: ", "(", names[k], ") ", messages[k]);

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

            // Decrypt here


        } else {
            console.log("Unenc: ", "(", names[k], ") ", messages[k]);
        }

        let options = {
            userIds: [{ name: names[k] }], // multiple user IDs
            numBits: 512,                                            // RSA key size
            passphrase: "abcd"       // protects the private key
        };

        openpgp.generateKey(options).then(function(key) {

            let generatedKey = [];
            generatedKey.private_key = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
            generatedKey.public_key = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
        });

    }

});
