using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerCrafterAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployerNotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployerNotifications",
                columns: table => new
                {
                    EmployerNotificationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployerId = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApplicationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployerNotifications", x => x.EmployerNotificationId);
                    table.ForeignKey(
                        name: "FK_EmployerNotifications_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employers",
                        principalColumn: "EmployerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployerNotifications_EmployerId",
                table: "EmployerNotifications",
                column: "EmployerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployerNotifications");
        }
    }
}
