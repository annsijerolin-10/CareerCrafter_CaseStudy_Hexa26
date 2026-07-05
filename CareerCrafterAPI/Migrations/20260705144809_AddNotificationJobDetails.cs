using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerCrafterAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddNotificationJobDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JobTitle",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "JobTitle",
                table: "Notifications");
        }
    }
}
