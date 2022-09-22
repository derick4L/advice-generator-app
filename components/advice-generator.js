const template = document.createElement("template");

template.innerHTML = `
<style>
    .card{
        background-color: var(--DarkGrayishBlue);
        border-radius: 15px;
        padding: 0 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 30px 50px 80px rgba(0, 0, 0, 0.100202);
    }

    .card-body{
        text-align: center;
        max-width: 444px;
    }

    .card-header .card-title{
        font-family: 'Manrope', sans-serif;
        font-weight: 800;
        font-size: 13px;
        line-height: 17.76px;
        color: var(--NeonGreen);
        letter-spacing: 4.09px;
        text-align: center;
        margin: 48px 0 24px 0;
    }

    .card-body .card-text #advice{
        font-family: 'Manrope', sans-serif;
        font-weight: 800;
        font-size: 28px;
        line-height: 38px;
        letter-spacing: -0.3px;
        color: var(--LightCyan);
        width: 30%;
    }

    #advice::before{
        content: '\u201C';
    }
    #advice::after{
        content: '\u201D';
    }

    .card-footer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-footer{
        margin: 25px 0 0 0;
    }

    #divider{
        margin: 0 0 10px 0;
    }

    .dice-container{
        transform: translateY(30px);
    }

    #circle{
        background-color: var(--NeonGreen);
        border-radius: 50%;
        height: 64px;
        width: 64px;
        display: flex;
        place-content: center;
    }

    #circle:hover{
        cursor: pointer;
        box-shadow: 0px 0px 40px var(--NeonGreen);
        transition: 0.3s ease-in-out;
    }

    #dice{
        display: flex;
        align-self: center;
    }

    @media (min-width: 320px) and (max-width: 425px ){
        .card{
            width: 343px;
            padding: 0;
        }
        .card-body{
            width: 295px;
        }
    }

</style>

<div class="card">
    <div class="card-header">
        <h1 class="card-title">ADVICE #<span id='advice-id'></h1>
    </div>
    <div class="card-body">
        <p class="card-text">
            <span id="advice"></span>
        </p>
    </div>
    <div class="card-footer">
        <img alt='divider' id='divider'/>
        <div class='dice-container'>
            <div id='circle'>
                <img src='../images/icon-dice.svg' alt='dice' id='dice'/>
            </div>
        </div>
    </div>
</div>
`;

class AdviceGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  getAdvice() {
    //reaches out to the advice api and gets a random advice on component load
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        this.shadowRoot.getElementById("advice-id").innerHTML = data.slip.id;
        this.shadowRoot.getElementById("advice").innerHTML = data.slip.advice;
      });
  }

  reload() {
    //on click, reload page with new advice
    window.location.reload();
  }

  connectedCallback() {
    this.getAdvice();

    this.shadowRoot
      .querySelector("#circle")
      .addEventListener("click", () => this.reload());

    if (window.innerWidth < 425) {
      this.shadowRoot.querySelector("#divider").src =
        "../images/pattern-divider-mobile.svg";
    } else if (window.innerWidth > 425) {
      this.shadowRoot.querySelector("#divider").src =
        "../images/pattern-divider-desktop.svg";
    }
  }
}

window.customElements.define("advice-generator", AdviceGenerator);
