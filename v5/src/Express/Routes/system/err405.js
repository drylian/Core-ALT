const methodNotAllowed = (req, res, next) => {  
    res.status(405).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>500</title>
      <style>
        body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(45deg, #7289DA, #00BFFF, #FF69B4);
        animation: backgroundMove 20s infinite linear;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }
      
      .container {
        text-align: center;
        animation: fadeIn 1s ease-in-out;
      }
      
      .content {
        margin-top: 50px;
        color: #363636;
        font-size: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 20px;
        border-radius: 5px;
      }
      
      .content h2 {
        color: #000000;
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      @keyframes backgroundMove {
        0% {
          background-position: 0 0;
        }
        50% {
          background-position: -200% -200%;
        }
        100% {
          background-position: 0 0;
        }
      }
      
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h2>405</h2>
          <p>Essa forma de solicitação não é permitida.</p>
          <p>Por favor, tente novamente mais tarde.</p>
        </div>
      </div>
    </body>
    </html>    
    `);
  };
  
  module.exports = methodNotAllowed;
  