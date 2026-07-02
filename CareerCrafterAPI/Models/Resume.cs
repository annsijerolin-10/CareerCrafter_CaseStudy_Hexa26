namespace CareerCrafterAPI.Models
{
  
        public class Resume
        {
            public int ResumeId { get; set; }
            public string ResumeFile { get; set; } = string.Empty;
            public DateTime UploadDate { get; set; }
            public int JobSeekerId { get; set; }
            public JobSeeker? JobSeeker { get; set; }
            public ICollection<Application>? Applications { get; set; }


    }
    
}
