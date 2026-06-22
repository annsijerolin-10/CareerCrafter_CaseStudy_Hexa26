using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerCrafterAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRequiredSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RequiredSkills",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequiredSkills",
                table: "Jobs");
        }
    }
}
