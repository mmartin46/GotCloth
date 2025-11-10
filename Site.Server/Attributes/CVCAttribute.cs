using System.ComponentModel.DataAnnotations;

namespace Site.Server.Attributes
{
    public class CVCAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null || value is not string)
            {
                return false;
            }
            bool lengthOfThree = (value as string).Length == 3;
            return lengthOfThree;
        }
    }
}
