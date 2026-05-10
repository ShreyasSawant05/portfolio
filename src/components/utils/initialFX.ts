import gsap from "gsap";
import { smoother } from "../Navbar";

function splitTextNodes(element: HTMLElement, allChars: HTMLElement[]) {
  const childNodes = Array.from(element.childNodes);
  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.trim() === "") return;
      const fragment = document.createDocumentFragment();
      text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        if (char === " ") {
           span.innerHTML = "&nbsp;";
        }
        span.style.display = "inline-block";
        fragment.appendChild(span);
        allChars.push(span);
      });
      element.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as HTMLElement).tagName !== 'BR') {
        splitTextNodes(node as HTMLElement, allChars);
      }
    }
  });
}

function splitTextCustom(selector: string | string[]) {
  const selectors = Array.isArray(selector) ? selector.join(",") : selector;
  const elements = document.querySelectorAll(selectors);
  const chars: HTMLElement[] = [];
  elements.forEach((el) => {
    (el as HTMLElement).style.overflow = "hidden";
    splitTextNodes(el as HTMLElement, chars);
  });
  return { chars };
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother?.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = splitTextCustom(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"]
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  var landingText2 = splitTextCustom(".landing-h2-info");
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  var landingText3 = splitTextCustom(".landing-h2-info-1");
  var landingText4 = splitTextCustom(".landing-h2-1");
  var landingText5 = splitTextCustom(".landing-h2-2");

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: any, Text2: any) {
  gsap.set(Text2.chars, { opacity: 0, y: 80 });
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
