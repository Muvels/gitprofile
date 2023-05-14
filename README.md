# GitProfile
🎨 Personalize your Profile Readme.md with CSS

## About GitProfile
GitProfile renders HTML code for your README files both for your profile and for your repositories, the special thing about GitProfile is that it also takes CSS into account when rendering the content. Which gives you infinitely more freedom in designing your README pages than the GitHub markdown renderer.


![EXAMPLE](https://gitprofilerender.vercel.app/?username=Muvels&repo=Muvels)


## Usage
Since the rendered HTML code is later output as an SVG image, the rendered content can be displayed on the README page via an image. The content is rendered JIT (Just in Time) each time. Therefore also dynamic content or changes in the layout are displayed directly.

Use GitProfile:
- Create a layout.html file in the `main` branch of your repository and write its content.
- In your GitHub file `ReadMe.md` add an image linked to the GitProfile URL.

That's it, now your layout page is rendered via GitProfile and you can use HTML and CSS to the fullest.

## GitProfile parameters

- `username` | **Connection to the correct User Profile** [*Required* ]

- `doInvisibleBg` | **Make background invisible** | [*Optional* ]

- `staticRendering` | **Dont wait until external resources (images etc.) are loaded** | [*Optional* ]

- `repo` | **Repo where the layout.html file is located** | [*Optional* ]


## You want it, you render it🎵
If you want GitProfile to run on your own Server, click the button to clone this repository and deploy it on Vercel:

[![](https://vercel.com/button)](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2FMuvels%2FGitProfile&showOptionalTeamCreation=false)
