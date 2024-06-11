using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Site.Server.Attributes
{
    public class ExpirationDateAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null || value is not string)
            {
                return false;
            }

            Regex matchRegex = new Regex("(1[0-2]|0?[1-9])/");
            bool validMatch = matchRegex.IsMatch(value as string);
            return validMatch;
        }
    }
}
