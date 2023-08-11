export const emailTemplate = (registrationCode) => `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Register</title>
  <style>
    :root {
      font-size: 1rem;
      line-height: 1.5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --padding: 5rem;
    }

    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      width: 100vw;
      height: 100vh;
    }

    body {
      background-color: hsl(0, 0%, 23%);
      text-align: center;
    }

    .header-container {
      display: flex;
      padding-inline: var(--padding);
      background-color: rgb(14, 7, 7);
      color: hsl(0, 0%, 95%);
      align-items: center;
      justify-content: center;
    }

    .body,
    .footer {
      padding-inline: var(--padding);
    }

    .body {
      padding-block: 3rem;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    .note {
      font-size: 0.875rem;
    }

    .body-header {
      color: hsl(0, 0%, 88%);
    }

    p {
      color: hsl(0, 0%, 85%);
    }

    .code{
        font-size:1.5rem;
        letter-spacing:4px;
    }

  </style>
</head>
<body>
  <main class="container">
    <div class="header-container">
      <h1>Cloacker</h1>
    </div>
    <div class="body">
      <div class="body-header">
        <h2>Registration Code</h2>
      </div>
      <p>Your registration code for Cloacker is:<span class="code" >${registrationCode}</span></p>
    </div>
    <div class="footer">
      <p class="note">
        Please advise that, the registration code is last up 1 day. If expires
        you should register again.
      </p>
    </div>
  </main>
</body>
</html>
`;
