module.exports = function (user) {
  return `<!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title>Confirmar cambio de contraseña</title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: Arial, sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500" rel="stylesheet">
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin:0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        table table table {
            table-layout: auto;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],  /* iOS */
        .x-gmail-data-detectors,    /* Gmail */
        .x-gmail-data-detectors *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }
        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display:none !important;
           }

        /* What it does: Prevents underlining the button text in Windows 10 */
        .button-link {
            text-decoration: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */
        /* Thanks to Eric Lepetit @ericlepetitsf) for help troubleshooting */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) { /* iPhone 6 and 6+ */
            .email-container {
                min-width: 375px !important;
            }
        }

    </style>

    <!-- Progressive Enhancements -->
    <style>

        /* What it does: Hover styles for buttons */
        .button-td,
        .button-a {
            transition: all 100ms ease-in;
        }
        .button-td:hover,
        .button-a:hover {
            background: #555555 !important;
            border-color: #555555 !important;
        }

        /* Media Queries */
        @media screen and (max-width: 480px) {

            /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */
            .fluid {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }

            /* What it does: Forces table cells into full-width rows. */
            .stack-column,
            .stack-column-center {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            /* And center justify these ones. */
            .stack-column-center {
                text-align: center !important;
            }

            /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
            .center-on-narrow {
                text-align: center !important;
                display: block !important;
                margin-left: auto !important;
                margin-right: auto !important;
                float: none !important;
            }
            table.center-on-narrow {
                display: inline-block !important;
            }

            /* What it does: Adjust typography on small screens to improve readability */
            .email-container p {
                font-size: 17px !important;
                line-height: 22px !important;
            }
        }

    </style>

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

</head>
<body width="100%" bgcolor="#F1F1F1" style="margin: 0; mso-line-height-rule: exactly;">
    <center style="width: 100%; background: #F1F1F1; text-align: left;">

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
            (Reseteo de clave) Ha solicitado un cambio de contraseña.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 680px.
            2. MSO tags for Desktop Windows Outlook enforce a 680px width.
            Note: The Fluid and Responsive templates have a different width (600px). The hybrid grid is more "fragile", and I've found that 680px is a good width. Change with caution.
        -->
        <div style="max-width: 680px; margin: auto;" class="email-container">
            <!--[if mso]>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
            <tr>
            <td>
            <![endif]-->

            <!-- Email Body : BEGIN -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;" class="email-container">      
                <tr>
                    <td bgcolor="#ffffff">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">                   
                            <tr>
                                <td style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; text-align: left; font-weight:normal;">
                                    <p style="margin: 0;">Hola ${user.nombres}, te saluda </p>
                                </td>
                            </tr>

                            <tr>
                                <td align="left" style="padding: 0px 40px 40px 40px;">

                                    <table width="180" align="left">
                                        <tr>
                                          <td width="70">
                                            <img src="https://firebasestorage.googleapis.com/v0/b/istb-storage.appspot.com/o/urbanizacion%2Fvalle_logo2.png?alt=media&token=09ba1407-81e4-4f97-b8d5-0e696ed43337" width="62" height="62" style="margin:0; padding:0; border:none; display:block;" border="0" alt="">
                                          </td>
                                          <td width="110">
                                            
                                            <table width="" cellpadding="0" cellspacing="0" border="0">
                                              <tr>
                                                <td align="left" style="font-family: sans-serif; font-size:14px; line-height:20px; color:#222222; font-weight:bold;" class="body-text">
                                                  <p style="font-family: 'Montserrat', sans-serif; font-size:14px; line-height:20px; color:#222222; font-weight:bold; padding:0; margin:0;" class="body-text">${process.env.APP_NAME}</p>   
                                                </td>               
                                              </tr>
                                              <tr>
                                                <td align="left" style="font-family: sans-serif; font-size:14px; line-height:20px; color:#666666;" class="body-text">
                                                  <p style="font-family: sans-serif; font-size:14px; line-height:20px; color:#666666; padding:0; margin:0;" class="body-text">Urb. | Valle Verde</p>    
                                                </td>               
                                              </tr>                            
                                            </table>

                                          </td>                        
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- INTRO : END -->

                <!-- CTA : BEGIN -->
                <tr>
                    <td bgcolor="#2da460 ">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 40px 40px 5px 40px; text-align: center;">
                                    <h1 style="margin: 0; font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 24px; color: #ffffff; font-weight: bold;">CONFIRMA TU CAMBIO DE CONTRASEÑA</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 17px; line-height: 23px; color: #aad4ea; text-align: center; font-weight:normal;">
                                    <p style="margin: 0;">Da click en el siguiente botón para cambiar tu contraseña.</p>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" align="center" style="text-align: center; padding: 0px 20px 40px 20px;">

                                    <!-- Button : BEGIN -->
                                    <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" class="center-on-narrow">
                                        <tr>
                                            <td style="border-radius: 50px; background: #ffffff; text-align: center;" class="button-td">
                                                <a href="${process.env.APP_URL}/confirm/password/reset/${user.id}/${user.residente.password_reset_code}" style="background: #ffffff; border: 15px solid #ffffff; font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 50px; font-weight: bold;" class="button-a">
                                                    <span style="color: #2da460;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;CAMBIAR CONTRASEÑA&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- Button : END -->

                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- CTA : END -->

                <!-- SOCIAL : BEGIN -->
                <tr>
                    <td bgcolor="#292828">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 30px 30px; text-align: center;">
                                    
                                    <table align="center" style="text-align: center;">
                                        <tr>
                                            <td>
                                                <img src="http://glennsmith.me/email/litmus/images/facebook.png" width="" height="" style="margin:0; padding:0; border:none; display:block;" border="0" alt="">
                                            </td>
                                            <td width="10">&nbsp;</td>
                                            <td>
                                                <img src="http://glennsmith.me/email/litmus/images/twitter.png" width="" height="" style="margin:0; padding:0; border:none; display:block;" border="0" alt="">
                                            </td>
                                            <td width="10">&nbsp;</td>
                                            <td>
                                                <img src="http://glennsmith.me/email/litmus/images/instagram.png" width="" height="" style="margin:0; padding:0; border:none; display:block;" border="0" alt="">
                                            </td>
                                            <td width="10">&nbsp;</td>
                                            <td>
                                                <img src="http://glennsmith.me/email/litmus/images/linkedin.png" width="" height="" style="margin:0; padding:0; border:none; display:block;" border="0" alt="">
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- SOCIAL : END -->

                <!-- FOOTER : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 40px 40px 10px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">
                                    <p style="margin: 0;">${process.env.APP_NAME}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 40px 10px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">
                                    <p style="margin: 0;">Si usted no solicitó el cambio de contraseña, por favor ignore este correo.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 40px 40px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: #666666; text-align: center; font-weight:normal;">
                                    <p style="margin: 0;">Copyright &copy; ${new Date().getFullYear()}-${(new Date().getFullYear() + 1)} <b>${process.env.APP_NAME}</b>, All Rights Reserved.</p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- FOOTER : END -->

            </table>
            <!-- Email Body : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>

    </center>
</body>
</html>`
}
