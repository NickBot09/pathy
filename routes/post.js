const express = require('express')
const router = express.Router()
const isAuth = require('../helpers/auth-check')
require('dotenv').config()

router.use(express.json())

const postArr = [{
    id: '1',
    title: "Subfinder - Passive subdomain enumeration tool",
    des: "<code>Subfinder</code> is a subdomain discovery tool that returns valid subdomains for websites, using passive online sources. It has a simple, modular architecture and is optimized for speed. subfinder is built for doing one thing only - passive subdomain enumeration, and it does that very well.<br><h3 class='pt-2'>Features</h3><ul><li>Fast and powerful resolution and wildcard elimination modules</li><li>Curated passive sources to maximize results</li><li>Multiple output formats supported (JSON, file, stdout)</li><li>Optimized for speed and lightweight on resources</li></ul><h3>Installation</h3><p>subfinder requires go1.21 to install successfully. Run the following command to install the latest version:</p><code>go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest</code><h3 class='pt-2'>Basic Usage</h3><p>To run Subfinder on a specific target use the <code>-d</code> flag to specify the domain.</p><code>subfinder -d hackerone.com</code>"
}, {
    id: '2',
    title: "Httpx",
    des: "<code>httpx</code> is a fast and multi-purpose HTTP toolkit that allows running multiple probes using the retryablehttp library. It is designed to maintain result reliability with an increased number of threads.<br><h3 class='pt-2'>Features</h3><ul><li>Simple and modular code base making it easy to contribute.</li><li>Fast And fully configurable flags to probe multiple elements.</li><li>Supports multiple HTTP based probings.</li><li>Smart auto fallback from https to http as default.</li></ul><h3>Installation</h3><p>httpx requires go1.21 to install successfully. Run the following command to install the latest version:</p><code>go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest</code><h3 class='pt-2'>Basic Usage</h3><p>Use <code>-sc</code> flag to get the status code of response.</p><code>subfinder -d hackerone.com | httpx -sc</code>"
}, {
    id: '3',
    title: "Naabu",
    des: "<code>Naabu</code>  is a port scanning tool written in Go that allows you to enumerate valid ports for hosts in a fast and reliable manner. It is a really simple tool that does fast SYN/CONNECT/UDP scans on the host/list of hosts and lists all ports that return a reply.<br><h3 class='pt-2'>Features</h3><ul><li>Fast And Simple SYN/CONNECT/UDP probe based scanning</li><li>Optimized for ease of use and lightweight on resources</li><li>Automatic IP Deduplication for DNS port scan</li><li>NMAP integration for service discovery</li></ul><h3>Installation</h3><p>naabu requires go1.21 to install successfully. Run the following command to install the latest version:</p><code>go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest</code><h3 class='pt-2'>Basic Usage</h3><p>To run the tool on a target, just use the following command.</p><code>naabu -host hackerone.com</code>"
}, {
    id: '4',
    title: "Nuclei - Fast vulnerability scanner",
    des: "<code>Nuclei</code> is used to send requests across targets based on a template, leading to zero false positives and providing fast scanning on a large number of hosts. Nuclei offers scanning for a variety of protocols, including TCP, DNS, HTTP, SSL, File, Whois, Websocket, Headless, Code etc. With powerful and flexible templating, Nuclei can be used to model all kinds of security checks.<br><h3>Installation</h3><p>nuclei requires go1.21 to install successfully. Run the following command to install the latest version:</p><code>go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest</code><h3 class='pt-2'>Basic Usage</h3><p>Executing nuclei against a list of inputs (urls, hosts, ips, cidrs, asn) is as simple as running the following command:</p><code>nuclei -l targets.txt</code><h3 class='pt-2'>Templates</h3><p>Nuclei has built-in support for automatic template download/update as default since version v2.5.2.<a href='https://github.com/projectdiscovery/nuclei-templates'> Nuclei-Templates</a> project provides a community-contributed list of ready-to-use templates that is constantly updated.</p>"
}, {
    id: '5',
    title: 'ffuf - a web fuzzer',
    des: "<code>ffuf</code> is a versatile and fast web fuzzer written in Go, primarily used for brute-forcing web applications to discover hidden resources and vulnerabilities. It efficiently handles various types of HTTP requests and supports multiple payloads, making it a powerful tool for penetration testers and security researchers.<br><h3 class='pt-3'>Installation</h3><p>ffuf requires go1.16 or greater to install successfully. Run the following command to install the latest version:</p><code>git clone https://github.com/ffuf/ffuf ; cd ffuf ; go get ; go build</code><h3 class='pt-3'>Basic Usage</h3><ul><li>Directory brute forcing:<br><code>ffuf -u https://hackerone.com/FUZZ/ -w directories.txt</code></li><li>Get based parameters:<br><code>ffuf -w /path/to/paramnames.txt -u https://target/script.php?FUZZ=test_value</code><li>Virtual host discovery:<br><code>ffuf -w /path/to/vhost/wordlist -u https://target -H 'Host: FUZZ'</code></li></ul>"
}, {
    id: '6',
    title: 'Amass',
    des: "<code>Amass</code> performs network mapping of attack surfaces and external asset discovery using open source information gathering and active reconnaissance techniques. It uses techniques like Api's, Certificates, DNS, Web Archive, Whois<br><h3 class='pt-3'>Installation</h3><code>go install -v github.com/owasp-amass/amass/v4/...@master</code><h3 class='pt-2'>Basic Usage</h3><ul><li>The amass tool and all the subcommands show options using the '-h' and '-help' flags:<br><code>amass -help</code></li><li>The most basic use of the tool for subdomain enumeration:<br><code>amass enum -d example.com</code><li>Executing the tool via the Docker image:<br><code>docker run -v OUTPUT_DIR_PATH:/.config/amass/ caffix/amass:latest enum --list</code></li></ul>"
}, {
    id: '7',
    title: 'Trufflehog - secrets scanner',
    des: "<code>Trufflehog</code> is a secrets scanning tool that digs deep into your code repositories to find secrets, passwords, and sensitive keys. It scans through commit history and branches to identify potential security risks, helping developers secure their projects by preventing accidental exposure of credentials.<br><h3 class='pt-3'>Installation</h3><p>Compile from source:</p><code>git clone https://github.com/trufflesecurity/trufflehog.git; cd trufflehog; go install</code><h3 class='pt-2'>Basic Usage</h3><ul><li>Scan a repo for only verified secrets:<br><code>trufflehog git https://github.com/trufflesecurity/test_keys --only-verified</code></li><li>Scan a GitHub Org for only verified secrets:<br><code>trufflehog github --org=trufflesecurity --only-verified</code><li>Scan a GitHub Repo for only verified keys and get JSON output:<br><code>trufflehog git https://github.com/trufflesecurity/test_keys --only-verified --json</code></li></ul>"
}, {
    id: '8',
    title: "ASNmap",
    des: "<code>ASNmap</code> Go CLI and Library for quickly mapping organization network ranges using ASN information.<br><h3 class='pt-3'>Installation</h3><p>asnmap requires Go 1.21 to install successfully. To install, just run the below command</p><code>go install github.com/projectdiscovery/asnmap/cmd/asnmap@latest</code><h3 class='pt-2'>Features</h3><ul><li>ASN to CIDR Lookup</li><li>Org to CIDR lookup</li><li>DNS to CIDR lookup</li><li>IP to CIDR lookup</li></ul><h3 class='pt-3'>Usage</h3><ul><li>ASN as input:<br><code>asnmap -a AS45596 -silent</code></li><li>Domain as input:<br><code>asnmap -d hackerone.com -silent</code></li><li>Org as input:<br><code>asnmap -org GOOGLE -silent</code></li></ul>"
}
]

let savedPost = [{'admin':[
    {
        "id":"1","title":"Subfinder - Passive subdomain enumeration tool","des":"<code>Subfinder</code> is a subdomain discovery tool that returns valid subdomains for websites, using passive online sources. It has a simple, modular architecture and is optimized for speed. subfinder is built for doing one thing only - passive subdomain enumeration, and it does that very well.<br><h3 class='pt-2'>Features</h3><ul><li>Fast and powerful resolution and wildcard elimination modules</li><li>Curated passive sources to maximize results</li><li>Multiple output formats supported (JSON, file, stdout)</li><li>Optimized for speed and lightweight on resources</li></ul><h3>Installation</h3><p>subfinder requires go1.21 to install successfully. Run the following command to install the latest version:</p><code>go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest</code><h3 class='pt-2'>Basic Usage</h3><p>To run Subfinder on a specific target use the <code>-d</code> flag to specify the domain.</p><code>subfinder -d hackerone.com</code>"
    }
]}]

router.post("/api/v1/posts/postid/:postId", isAuth, (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        res.json({ msg: "postId is required" })
    } else {
        const data = postArr.filter(post => { return post.id == postId })
        if (data.length != 0) {
            // console.log(req.user)
            res.json({ data: data[0] })
        } else {
            res.status(404).json({ msg: "Post not found" })
        }

    }

})

router.post('/api/v1/posts/save-post', isAuth, (req, res) => {
    const postId = req.body.id
    if (!postId) {
        res.status(404).json({ msg: 'Invalid Post id' })
    }

    const data = postArr.filter(post => postId == post.id)
    const user = req.user
    const temArr = {}
    temArr[user] = data
    savedPost.push(temArr)
    res.json({ msg: 'Post Saved Successfully' })
})

router.post("/api/v1/posts/saved-posts", isAuth, (req, res) => {
    const user = req.user
    const res2 = savedPost.filter(post => {
        if(post.hasOwnProperty(user)) {
            // console.log(post[user])
            return post[user]
        }
    })
    // console.log(savedPost)
    // console.log(res2)
    let arrToSend = []
    // console.log(res2)
    res2.map(singleObj => {
        singleObj[user].map(i => arrToSend.push(i))
    })
    res.json({ data : arrToSend })
})

router.post("/api/v1/posts/delete-post", isAuth, (req, res) => {
    // savedPost.length = 0
    const tempArr = savedPost.filter(entry => !entry.hasOwnProperty(req.user))
    // console.log(tempArr)
    savedPost = tempArr
    // console.log(savedPost)
    res.json({ msg: 'Ok' })
})


router.get("/flag", (req, res) => {
    const tempArr = savedPost.filter(entry => entry.hasOwnProperty('admin'))
    if(tempArr.length == 0) {
        res.send(process.env.FLAG)
    } else {
        res.send('Challenge not solved, hence you will not get the flag')
    }
})

router.get('/submit-url', (req, res) => {
    res.sendFile(__dirname + '/ui/url.html')
})

module.exports = router
