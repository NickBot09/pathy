## Summary

This challenge is based on CSPT (Client side path traversal). It uses CSPT and chains it with a CSRF kind of exploit. The initial inspiration was taken from the research put out by [@maxenceschmitt](https://x.com/maxenceschmitt). The app is a simple node js app. For the user to get the flag, they must perform a CSPT to CSRF exploit on the admin user and delete the post that are saved by admin. User can deliver the exploit to admin by clicking on `Deliver Exploit` button. The admin user is a puppeteer bot that will take the link and open it in a browser. If the exploit url is crafted properly, the end user can retrieve the flag by making a `Get` request to `/flag` endpoint.
<hr>

## Challenge Name :- Pathy

### Description: 

Welcome to **Pathy**! A path that leads to another path. Strange? No. Navigate through a labyrinth of client-side web vulnerabilities. Think creatively and exploit the hidden *paths* that lead to secrets. Beware, not everything is as it seems, and sometimes the *path* to success is a detour.

### Your Mission:
1. The admin has saved some secret posts for himself. Can you delete them?
2. Craft an exploit or URL that takes advantage of the hidden vulnerabilities.
3. Deliver the exploit to the admin user using the "Deliver Exploit" button.
4. Admin clicks on any link that is sent to him. If the exploit is successful, you can retrieve the flag located at `/flag`.

Will you be able to untangle the web and find the flag?

### Hints 

- Paths can be deceptive; the right path might not be the obvious one. Consider how you may *traverse* back or forth.
- Consider how you can manipulate navigation to reach your goal.

### Deployment

**Note**: Make sure you have `.env` file with the following content
```
SECRET_KEY=nkdiwhqiudhui86321iguwdq // Can be changed
PORT=1337 // Can be changed
FLAG=flag{Cl13nt_S1d3_P4th_Tr4v3rs4l_1$_@_Th1ng} // Can be changed
```

To deploy the challenge, run the following Docker command:
```
docker build -t app-image --build-arg $port=<value set in your .env for PORT> .

# Suppose you have set PORT to 1337 in your .env then,
docker build -t app-image --build-arg $port=1337 .
```
```
docker run --name app -p <your-port>:<your-port> app-image

# Suppose you have set PORT to 1337 in your .env then,
docker run --name app -p 1337:1337 app-image
```

Now you can access the challenge at `http://localhost:1337/`
<hr>

### Solution

- A full detailed solution can be found under `/solution/` directory
