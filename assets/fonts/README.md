# Fonts

CGC's display face is **Bw Gradual**. It is a licensed font, so the binaries
are not committed to this repo — `.gitignore` keeps them out.

To render the page as designed, drop these four files in here:

```
BwGradual-Light.otf     300
BwGradual-Regular.otf   400
BwGradual-Medium.otf    500
BwGradual-Bold.otf      700
```

`tokens.css` already declares the `@font-face` rules for them.

Without those files the page falls back to **Poppins**, the documented stand-in
for layout purposes. Bw Gradual is a soft, low contrast geometric sans with a
gradual stroke taper; Work Sans and Figtree are the other reasonable stand-ins.
Nothing should go to the client in a substitute face without that being flagged.
