using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace SpeakerGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        [HttpPost]
        public IActionResult Post([FromBody] Modules.Helper baseString)
        {
            List<Modules.DescriptionTag> responseList = new List<Modules.DescriptionTag>();

            var bytes = Convert.FromBase64String(baseString.Text);

            string path = Environment.CurrentDirectory + @"\Image.jpg";
            FileStream imageFile;
            using (imageFile = new FileStream(path, FileMode.Create))
            {
                imageFile.Write(bytes ,0, bytes.Length);
                imageFile.Flush();
            
            }

  
            string datum = DateTime.Now.ToString().Replace(".", "").Replace(":", "").Replace(" ", "");
        
            // Call Google API ImageAnnotatorClient 
            responseList = Modules.GoogleApiConnector.GetTagsFromPicture(path);


            //For debugging reasons

            //string json = JsonConvert.SerializeObject(httpRequest.Form.Files[0], Formatting.Indented);
            //System.Diagnostics.Debug.WriteLine("Json:" + json);
            

            return Created("", responseList);
        }

    }
}
