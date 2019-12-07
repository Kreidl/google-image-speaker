using Google.Cloud.TextToSpeech.V1;
using Google.Cloud.Vision.V1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakerGateway.Modules

    {
    public class GoogleApiConnector
    {

        /*##################################################

          Call Google Text To Speech  API

       ###################################################*/
        internal static String GetSpeech(string inputString)
        {

            TextToSpeechClient client = TextToSpeechClient.Create();

            // Set the text input to be synthesized.
            string mySsml = "<speak>";
            mySsml += inputString;
            mySsml += "</speak>";

            /* Filename */
            string fileName = "Speech";

            SynthesisInput input = new SynthesisInput
            {
                Ssml = mySsml
            };
           
            // Build the voice request, select the language code ("en-US"),
            // and the SSML voice gender ("neutral").
            VoiceSelectionParams voice = new VoiceSelectionParams
            {
                LanguageCode = "en-us",
                SsmlGender = SsmlVoiceGender.Female
            };

            // Select the type of audio file you want returned.
            AudioConfig config = new AudioConfig
            {
                AudioEncoding = AudioEncoding.Mp3,
                SpeakingRate = .7
            };

            // Perform the Text-to-Speech request, passing the text input
            // with the selected voice parameters and audio file type
            var response = client.SynthesizeSpeech(new SynthesizeSpeechRequest
            {
                Input = input,
                Voice = voice,
                AudioConfig = config
            });

            // Write the binary AudioContent of the response to an MP3 file.
            using (Stream output = System.IO.File.Create(fileName + ".mp3"))
            {
                response.AudioContent.WriteTo(output);
            }
 
            //return ;
            byte[] data = System.IO.File.ReadAllBytes(fileName + ".mp3");
            return "{\"body\": \""+Convert.ToBase64String(data)+"\"}";
            //return "audio/mpeg3;base64," + response.AudioContent.ToBase64();

            //return Convert.ToBase64String(response.AudioContent, 0, response.AudioContent.Length, 
              //                  Base64FormattingOptions.InsertLineBreaks); 
        }

        /*##################################################
           
            Call Google Vision API
             
         ###################################################*/
        internal static List<DescriptionTag> GetTagsFromPicture(string outFileName)
        {
            List<DescriptionTag> DescriptionList = new List<DescriptionTag>();

            // Instantiates a client
            var client = ImageAnnotatorClient.Create();
            // Load the image file into memory
            var image = Image.FromFile(outFileName);

            /* 
              ---------------  Gefundene Labels zum Bild -----------------
            */
            var labelResponse = client.DetectLabels(image);
            foreach (var annotation in labelResponse)
            {
                if (annotation.Description != null)
                    DescriptionList.Add(new DescriptionTag()
                    {
                        TagType = "Label",
                        Description = annotation.Description,
                        Percentage = Math.Round(annotation.Score * 100, 2)
                    });

            }

            /*
             -------- gefundene WEB Tags zum Bild -------------------------
             */
            var webresponse = client.DetectWebInformation(image);
            foreach (var item in webresponse.WebEntities)
            {
                DescriptionList.Add(new DescriptionTag()
                {
                    TagType = "WEB",
                    Description = item.Description,
                    Percentage = Math.Round(item.Score * 100, 2)
                });
            }

            return DescriptionList;
        }

    }
}
